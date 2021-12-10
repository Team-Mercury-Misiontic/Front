import Usuario from '../../usuario.json';
import { toast } from "react-toastify";
import {useState, useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_PROYECTOS} from '../../graphql/proyectos/queries';
import {Link} from 'react-router-dom';
import Objetivos from 'components/Objetivos';
import ReactLoading from "react-loading";

const Proyectos = ()=> { 
    const {data, error, loading}=useQuery(GET_PROYECTOS);
    useEffect(() => {
        if (error) {
        console.error(`error obteniendo los usuarios ${error}`)
        toast.error("Error consultando los usuarios");
        return `error obteniendo los usuarios ${error}`
        }
    }, [error]);
    if (loading) return <ReactLoading type="cylon" color="#4c2882" height={667} width={365} />;
    if (data) {
        if (Usuario.rol === 'ADMINISTRADOR'){
            return(
                <div className ="w-full">
                    <div className="my-6 font-sans text-4xl text-center font-bold">
                        <h1 className="text-3xl font-extrabold text-gray-900 my-3 text-center">PROYECTOS</h1>
                    </div>
                    <Administrador data={data.Proyectos}/>
                </div>
            )
        } else if (Usuario.rol === 'LIDER') {
            return(
                <div className ="w-full">
                    <div className="my-6 font-sans text-4xl text-center font-bold">
                        <h1 className="text-3xl font-extrabold text-gray-900 my-3 text-center">PROYECTOS LIDERADOS</h1>
                    </div>           
                    <Lider data={data.Proyectos}/>
                </div>
            )        
        } else if (Usuario.rol === 'ESTUDIANTE'){
            return(
                <div className ="w-full">
                    <div className="my-6 font-sans text-4xl text-center font-bold">
                        <h1 className="text-3xl font-extrabold text-gray-900 my-3 text-center">PROYECTOS</h1>
                    </div>               
                    <Estudiante data={data.Proyectos}/>
                </div>
            ) 
        }
}else return "REVISE LOS PROYECTOS HAY ALGUN DATO QUE ESTA MAL"} 

const Administrador = ({data}) => {
    const [busqueda, setBusqueda] = useState("");
    const bChange = (e) => {
        setBusqueda(e.target.value);
    };
    const datos = data.filter((proyecto) => {
        if (
          proyecto._id.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
          proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
        ) {
          return proyecto
        }
      }).map((item) => {
        const objetivos = item.objetivos.map((objetivo) => {
            return (
                <>
                    <li className="list-none">{objetivo.descripcion}</li>
                </>
            )
        })
        return(
            <>
            <tr>
                <td key={item._id} className="text-center"> {item._id}</td>
                <td> {item.nombre}</td>
                <td> {item.lider.nombre} {item.lider.apellido}</td>
                <td> {item.fase}</td>
                <td> {objetivos}</td>
                <td> 
                    <Link to={`/Proyectos/${item._id}` } className="block bg-blue-400 hover:bg-blue-600 rounded-full px-2 text-white h-6 mb-1">Ver mas</Link>
                    {item.fase === "TERMINADO" ? null : <Link to={`/Proyectos/EditarProyecto/${item._id}`} className="block bg-green-400 hover:bg-green-600 rounded-full px-2 text-white h-6">Gestionar</Link>}
                    
                </td>
            </tr>
            </>
    )})    
    return (
        <>
        <div className="pl-4 mb-5">
            <label className="font-bold">BUSCAR: </label>
            <input className="appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={busqueda} placeholder="Búsqueda por Identificación o Nombre" onChange={bChange}/>
        </div> 
        <table className="tabla">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre del Proyecto</th>
                    <th scope="col">Lider</th>
                    <th scope="col">Fase</th>
                    <th scope="col">Objetivos</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos}
            </tbody>
        </table>
        </>
    )
}

const Lider = ({data}) => {
    const [busqueda, setBusqueda] = useState("");
    const [activo, isActivo] = useState(false);
    const bChange = (e) => {
        setBusqueda(e.target.value);
    };
    const datos = data.filter((proyecto) => {
          if (
            proyecto._id.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
            proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())||
            proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase())||
            proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
          ) {
            return proyecto
          }
        }).map((item) =>{
        const Gestionar = (item) =>{
            if (item.item.estado === "ACTIVO") {
                return(
                    <>
                        <Link to={`/Proyectos/EditarProyecto/${item.item._id}` } className="block px-2 bg-green-400 hover:bg-green-600 rounded-full text-white h-6">Gestionar</Link>
                    </>
                )
            } else return null
        };  
        if (item.lider._id === Usuario._id) {
            if (activo === true && item.estado === "ACTIVO") {
                return(
                    <>
                    <tr>
                        <td key={item.id} className="text-center"> {item._id}</td>
                        <td> {item.nombre}</td>
                        <td> {item.lider.nombre} {item.lider.apellido}</td>
                        <td> {item.fase}</td>
                        <td> <Objetivos item={item} tipo="GENERAL" className="list-none"/></td>
                        <td> 
                            <Link to={`/Proyectos/${item._id}` } className="block bg-blue-400 px-2 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                            <Gestionar item={item}/>
                        </td>
                    </tr>
                    </>
            )
            }else if(activo === false){
            return(
                <>
                <tr>
                    <td key={item.id} className="text-center"> {item._id}</td>
                    <td> {item.nombre}</td>
                    <td> {item.lider.nombre} {item.lider.apellido}</td>
                    <td> {item.fase}</td>
                    <td> <Objetivos item={item} tipo="GENERAL" className="list-none"/></td>
                    <td> 
                        <Link to={`/Proyectos/${item._id}` } className="block bg-blue-400 px-2 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                        <Gestionar item={item}/>
                    </td>
                </tr>
                </>
        )} else return null
    } 
    })    
        return (
            <>
            <div className="pl-4 mb-5">
                <label className="font-bold">BUSCAR: </label>
                <input className="appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={busqueda} placeholder="Búsqueda por Identificación o Nombre" onChange={bChange}/>
                <Link to="/Proyectos/NuevoProyecto" className="bg-indigo-700 text-white font-bold text-lg py-3 px-6 relative top-3 left-1/4 rounded-xl hover:bg-indigo-500 shadow-md" >Crear Proyecto</Link>
                <div>
                    <input type="checkbox" className="mx-2" id="active" onClick={(e)=>isActivo(!activo)}/>
                    <label htmlFor="active" className="text-base">Solo proyectos activos</label>
                </div>
            </div>   
            <table className="tabla">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre del Proyecto</th>
                        <th scope="col">Lider</th>
                        <th scope="col">Fase</th>
                        <th scope="col">Objetivos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos}
                </tbody>
            </table>
            </>
        ) 
}

/* const Estudiante = ({data , registrado}) => {
    const [busqueda, setBusqueda] = useState("");
    const bChange = (e) => {
        setBusqueda(e.target.value);
    };
    const datos = data.filter((proyecto) => {
        if (
          proyecto._id.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
          proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
        ) {
          return proyecto
        }
      }).map((item)=>{
        const objetivos = item.objetivos.map((objetivo) => {
            return (
                <>
                    <li className="list-none">{objetivo.descripcion}</li>
                </>
            )
        })
        const filtro = item.registros.filter((registro) => registro.estudiante._id === Usuario._id)
        if (registrado && item.estado === "ACTIVO"){
            if (filtro.length!==0){
                return (
                    <>
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.lider.nombre} {item.lider.apellido}</td>
                        <td>{item.fase}</td>
                        <td>{objetivos}</td>
                        <td> 
                            <Link to={`/Proyectos/${item._id}` } className="block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                        </td>
                    </tr>
                    </>
                    )
            } else return null
        } else  if (registrado === false && item.estado === "ACTIVO"){
            if (filtro.length===0){
                return (
                    <>
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.lider.nombre} {item.lider.apellido}</td>
                        <td>{item.fase}</td>
                        <td>{objetivos}</td>
                        <td> 
                            <Link to={`/Proyectos/${item._id}` } className="block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                        </td>
                    </tr>
                    </>
                    )
            } return null
    }})
    return (
        <>
        <div className="pl-4 mb-5">
            <label className="font-bold">BUSCAR: </label>
            <input className="appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={busqueda} placeholder="Búsqueda por Identificación o Nombre" onChange={bChange}/>
        </div> 
        <table className="tabla">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre del Proyecto</th>
                    <th scope="col">Lider</th>
                    <th scope="col">Fase</th>
                    <th scope="col">Objetivos</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos}
            </tbody>
        </table>
        </>
    )
} */

const Estudiante = ({data}) => {
    const [busqueda, setBusqueda] = useState("");
    const [registrado,isRegistrado] = useState(false)
    const bChange = (e) => {
        setBusqueda(e.target.value);
    };
    const datos = data.filter((proyecto) => {
        if (
          proyecto._id.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
          proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase())||
          proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
        ) {
          return proyecto
        }
      }).map((item)=>{
        const objetivos = item.objetivos.map((objetivo) => {
            return (
                <>
                    <li className="list-none">{objetivo.descripcion}</li>
                </>
            )
        })
        const filtro = item.registros.filter((registro) => registro.estudiante._id === Usuario._id)
        if (registrado && item.estado === "ACTIVO"){
            if (filtro.length!==0){
                return (
                    <>
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.lider.nombre} {item.lider.apellido}</td>
                        <td>{item.fase}</td>
                        <td>{objetivos}</td>
                        <td> 
                            <Link to={`/Proyectos/${item._id}` } className="block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                        </td>
                    </tr>
                    </>
                    )
            } else return null
        } else  if (registrado === false && item.estado === "ACTIVO"){
            if (filtro.length===0){
                return (
                    <>
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.lider.nombre} {item.lider.apellido}</td>
                        <td>{item.fase}</td>
                        <td>{objetivos}</td>
                        <td> 
                            <Link to={`/Proyectos/${item._id}` } className="block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1">Ver mas</Link>
                        </td>
                    </tr>
                    </>
                    )
            } return null
    }})
    return (
        <>
        <div className="pl-4 mb-5">
            <label className="font-bold">BUSCAR: </label>
            <input className="appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={busqueda} placeholder="Búsqueda por Identificación o Nombre" onChange={bChange}/>
            <div>
                <input type="checkbox" className="mx-2" id="active" onClick={(e)=>isRegistrado(!registrado)}/>
                <label htmlFor="active" className="text-base">Proyectos en curso </label>
            </div>
        </div> 
        <table className="tabla">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre del Proyecto</th>
                    <th scope="col">Lider</th>
                    <th scope="col">Fase</th>
                    <th scope="col">Objetivos</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos}
            </tbody>
        </table>
        </>
    )
}

export default Proyectos