import Usuario from '../../usuario.json';
import {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_PROYECTOS} from '../../graphql/proyectos/queries';
import {Link} from 'react-router-dom';

const Proyectos = ()=> { 
    const {data, error, loading}=useQuery(GET_PROYECTOS);
    console.log("carga de proyecto",data);
    if (error) return `Error! ${error}`;  
    if (loading) return 'Loading...';
    if (data) {
        console.log("carga de proyecto",data.Proyectos);
    if (Usuario.rol === 'ADMINISTRADOR'){
        return(
            <div className ="w-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Todos los proyectos</h1>
                </div>
                <Administrador data={data}/>
            </div>
        )
    } else if (Usuario.rol === 'LIDER') {
        return(
            <div className ="w-full">
                <div className="mb-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos liderados</h1>
                </div>
                <div >
                    <Link to="/Proyectos/NuevoProyecto" className="bg-gray-300" >Crear Proyecto</Link>
                </div>              
                <Lider data={data.Proyectos}/>
            </div>
        )        
    } else {
        return(
            <div className ="w-full">
                <div className="py-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos vinculados</h1>
                </div>               
                <Estudiante data={data.Proyectos} registrado={true}/>
                <div className="py-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos Disponibles</h1>
                </div> 
                <Estudiante data={data.Proyectos} registrado={false}/>
            </div>
        ) 
    }
}} 

const Administrador = ({data}) => {
    const datos = data.Proyectos.map((item) => {
    console.log(item.registros);
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
                <td className="text-center"> {item.nombre}</td>
                <td className="text-center"> {item.lider.nombre} {item.lider.apellido}</td>
                <td className="text-center"> {item.fase}</td>
                <td className="text-center"> {objetivos}</td>
                <td className="text-center"> 
                    <Link to={`/Proyectos/${item._id}` } className="border-green-500 border-solid border-2 block font-bold text-black h-6">MAS</Link>
                    <Link to={`/Proyectos/EditarProyecto/${item._id}`} className=" border-green-500 border-solid block border-2 font-bold text-black h-6">GESTIONAR</Link>
                </td>
            </tr>
            </>
    )})    
    return (
        <>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">ID</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Proyecto</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lider</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fase</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivos</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {datos}
            </tbody>
        </table>
        </>
    )
}

const Lider = ({data}) => {
    const datos = data.map((item) =>{
        if (item.lider._id === Usuario._id) {
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
                    <td key={item.id} className="text-center"> {item._id}</td>
                    <td className="text-center"> {item.nombre}</td>
                    <td className="text-center"> {item.lider.nombre} {item.lider.apellido}</td>
                    <td className="text-center"> {item.fase}</td>
                    <td className="text-center"> {objetivos}</td>
                    <td className="text-center"> 
                        <Link to={`/Proyectos/${item._id}` } className="border-green-500 border-solid border-2 block font-bold text-black h-6">MAS</Link>
                        <Link to={`/Proyectos/EditarProyecto/${item._id}` } className="border-green-500 border-solid border-2 block font-bold text-black h-6">GESTIONAR</Link>
                    </td>
                </tr>
                </>
        )} 
    })    
        return (
            <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">ID</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Proyecto</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lider</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fase</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivos</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {datos}
                </tbody>
            </table>
            </>
        ) 
}

const Estudiante = ({data , registrado}) => {
    const Registrado = registrado
    const datos = data.map((item)=>{
        const objetivos = item.objetivos.map((objetivo) => {
            return (
                <>
                    <li className="list-none">{objetivo.descripcion}</li>
                </>
            )
        })
        const filtro = item.registros.filter((registro) => registro.estudiante._id === Usuario._id)
        if (Registrado){
            if (filtro.length!==0){
                return (
                    <>
                    <tr>
                        <td className="text-center">{item._id}</td>
                        <td className="text-center">{item.nombre}</td>
                        <td className="text-center">{item.lider.nombre} {item.lider.apellido}</td>
                        <td className="text-center">{item.fase}</td>
                        <td className="text-center">{objetivos}</td>
                        <td className="text-center"> 
                            <Link to={`/Proyectos/${item._id}` } className="border-green-500 border-solid border-2 block font-bold text-black h-6">MAS</Link>
                        </td>
                    </tr>
                    </>
                    )
            } else return null
        } else {
            if (filtro.length===0){
                return (
                    <>
                    <tr>
                        <td className="text-center">{item._id}</td>
                        <td className="text-center">{item.nombre}</td>
                        <td className="text-center">{item.lider.nombre} {item.lider.apellido}</td>
                        <td className="text-center">{item.fase}</td>
                        <td className="text-center">{objetivos}</td>
                        <td className="text-center"> 
                            <Link to={`/Proyectos/${item._id}` } className="border-green-500 border-solid border-2 block font-bold text-black h-6">MAS</Link>
                        </td>
                    </tr>
                    </>
                    )
            } return null
    }})
    return (
        <>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">ID</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Proyecto</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lider</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fase</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivos</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {datos}
            </tbody>
        </table>
        </>
    )
}

export default Proyectos