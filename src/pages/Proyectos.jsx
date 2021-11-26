import Usuario from '../usuario.json';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_PROYECTOS} from '../graphql/proyectos/queries';
import {NavLink} from 'react-router-dom';



const Proyectos = ()=> { 
    const {data, error, loading}=useQuery(GET_PROYECTOS);
    useEffect(() => {
        // console.log('data servidor', data);
      }, [data]);
    useEffect(() => {
        if (error) {
          toast.error('Error consultando los proyectos');
        }
      }, [error]);

      if (loading) return <div>Cargando....</div>;

    if (Usuario.rol === 'ADMINISTRADOR'){
        return(
            <div className ="h-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Todos los proyectos</h1>
                </div>
                <Administrador data={data.Proyectos}/>
            </div>
        )
    } else if (Usuario.rol === 'LIDER') {
        return(
            <div className ="h-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos liderados</h1>
                </div>
                <div >
                    <NavLink to="/Proyectos/NuevoProyecto" className="bg-gray-300" >Crear Proyecto</NavLink>
                </div>              
                <Lider data={data.Proyectos}/>
            </div>
        )        
    } else {
        return(
            <div className ="h-full">
                <div className="py-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos vinculados</h1>
                </div>               
                <Estudiante data={data.Proyectos}/>
                <div className="py-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos Disponibles</h1>
                </div> 
                <NoEstudiante data={data.Proyectos}/>
            </div>
        ) 
    }
}

const Administrador = ({data}) => {
    let i = 0;
    const datos = data.map((item) => {
    i = i + 1;
    console.log(item.registros);
        const registros = item.registros.map((registro) => {
            const estudiantes = registro.estudiante.map((estudiante)=>{
                return (
                    <>
                        <tr>{estudiante.nombre}{estudiante.apellido}</tr>
                    </>
                    )
            })
            return estudiantes
        })

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
                <td className="text-center"> <a href={"#"+ i } >Ver mas</a></td>
            </tr>
            <tr id={i} className="hidden oculto">
                <td colSpan="3">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td key={item.id}>{registros}</td>
                                <td>{item.presupuesto}</td>
                                <td>{item.fechaInicio}</td>
                                <td>{item.fechaFin}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td colSpan="2" className="text-center">AVANCES</td>
                <td className="text-center"><a href="/proyectos">Ver menos</a></td>
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
    let i = 0;
    const datos = data.map((item) =>{
        if (item.lider._id === Usuario._id) {
            i = i + 1;
            const registros = item.registros.map((registro) => {
                const estudiantes = registro.estudiante.map((estudiante)=>{
                    return (
                        <>
                            <tr>{estudiante.nombre}{estudiante.apellido}</tr>
                        </>
                        )
                })
                return estudiantes
            })

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
                    <td className="text-center"> <a href={"#"+ i } className="bg-green-300 border-green-500 block font-bold text-white h-6">MAS</a></td>
                </tr>
                <tr id={i} className="hidden oculto">
                    <td colSpan="3">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td>{registros}</td>
                                    <td>{item.presupuesto}</td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td colSpan="2" className="text-center">AVANCES</td>
                    <td className="text-center"><a href="/proyectos" className="bg-red-400 border-red-500 block  font-bold text-white h-6">MENOS</a></td>
                </tr>
                </>
        )} else return null
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

const Estudiante = ({data}) => {
    let i = 0;
    const datos = data.map((item) =>{
        i = i + 1;
        const pertenece = item.registros.map((registro) => {
            const estudiantes = registro.estudiante.map((estudiante)=> {
                if(estudiante._id === Usuario._id){
                    registro.estudiantes.map((estudiante) => {
                        return (
                            <>
                        <tr>{estudiante.nombre} {estudiante.apellido}</tr>
                    </>
                )
            })}
            })
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
                    <td className="text-center"> <a href={"#"+ i } >Ver mas</a></td>
                </tr>
                <tr id={i} className="hidden oculto">
                    <td colSpan="3">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td>{estudiantes}</td>
                                    <td>{item.presupuesto}</td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td colSpan="2" className="text-center">AVANCES</td>
                    <td className="text-center"><a href="/proyectos">Ver menos</a></td>
                </tr>
                </>
        )}
    )
        return pertenece
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
    )}

const NoEstudiante = ({data}) => {
    let i = 0;
    const datos = data.map((item) =>{
        const registros = item.registros
        const filtro = registros.estudiantes.filter((estudiante)=> estudiante._id!==Usuario._id)
        const estudiantes = registros.estudiantes.map((estudiante) => {
            if (filtro.length===registros.estudiantes.length){
                return (
                    <>
                        <tr>{estudiante.nombre} {estudiante.apellido}</tr>
                    </>
                )} else return null
        })
        const objetivos = item.objetivos.map((objetivo) => {
            if (filtro.length===registros.estudiantes.length){
                return (
                    <>
                        <li className="list-none">{objetivo.descripcion}</li>
                    </>
                )} else return null
            })
        if (filtro.length===registros.estudiantes.length){
            return(
                <>
                <tr>
                    <td key={item.id} className="text-center"> {item._id}</td>
                    <td className="text-center"> {item.nombre}</td>
                    <td className="text-center"> {item.lider.nombre} {item.lider.apellido}</td>
                    <td className="text-center"> {item.fase}</td>
                    <td className="text-center"> {objetivos}</td>
                    <td className="text-center"> <a href={"#"+ i } >Ver mas</a></td>
                </tr>
                <tr id={i} className="hidden oculto">
                    <td colSpan="3">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td>{estudiantes}</td>
                                    <td>{item.presupuesto}</td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td colSpan="2" className="text-center">AVANCES</td>
                    <td className="text-center"><a href="/proyectos">Ver menos</a></td>
                </tr>
                </>
        )
        } else return null
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
        )}
export default Proyectos