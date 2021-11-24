import Proyecto from'../proyecto.json';
import Usuario from '../usuario.json';
import {NavLink} from 'react-router-dom';



const Proyectos = ()=> { 

    if (Usuario.rol === 'administrador'){
        return(
            <div className ="h-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Todos los proyectos</h1>
                </div>
                <Administrador/>
            </div>
        )
    } else if (Usuario.rol === 'lider') {
        return(
            <div className ="h-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos liderados</h1>
                </div>
                <div >
                    <NavLink to="/Proyectos/NuevoProyecto" className="bg-gray-300" >Crear Proyecto</NavLink>
                </div>              
                <Lider/>
            </div>
        )        
    } else {
        return(
            <div className ="h-full">
                <div className="my-6 ml-3 font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos vinculados</h1>
                </div>               
                <Estudiante/>
                <div className="font-sans text-4xl font-bold uppercase">
                    <h1>Proyectos Disponibles</h1>
                </div> 
            </div>
        ) 
    }
}

const Administrador = () => {
    let i = 0;
    const datos = Proyecto.map((item) => {
    i = i + 1;
        const estudiantes = item.estudiantes.map((estudiante) => {
            return (
                <>
                    <tr>{estudiante.nombre} {estudiante.apellido}</tr>
                </>
            )
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
                <td className="text-center"> {item._id}</td>
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <td>{estudiantes}</td>
                            <td>{item.presupuesto}</td>
                            <td>{item.fechaInicio}</td>
                            <td>{item.fechaFin}</td>
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

const Lider = () => {
    let i = 0;
    const datos = Proyecto.map((item) =>{
        if (item.lider._id === Usuario._id) {
            i = i + 1;
            const estudiantes = item.estudiantes.map((estudiante) => {
                return (
                    <>
                        <tr>{estudiante.nombre} {estudiante.apellido}</tr>
                    </>
                )
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
                    <td className="text-center"> {item._id}</td>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <td>{estudiantes}</td>
                                <td>{item.presupuesto}</td>
                                <td>{item.fechaInicio}</td>
                                <td>{item.fechaFin}</td>
                            </tbody>
                        </table>
                    </td>
                    <td colSpan="2" className="text-center">AVANCES</td>
                    <td className="text-center"><a href="/proyectos" className="bg-red-400 border-red-500 block  font-bold text-white h-6">MENOS</a></td>
                </tr>
                </>
        )}
    })    
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

const Estudiante = () => {
    let i = 0;
    const datos = Proyecto.map((item) =>{
        i = i + 1;
        const pertenece = item.estudiantes.map((estudiante) => {
            if(estudiante._id === Usuario._id){
            const estudiantes = item.estudiantes.map((estudiante) => {
                return (
                    <>
                        <tr>{estudiante.nombre} {estudiante.apellido}</tr>
                    </>
                )
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
                    <td className="text-center"> {item._id}</td>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de inicio</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de finalizacion</th>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <td>{estudiantes}</td>
                                <td>{item.presupuesto}</td>
                                <td>{item.fechaInicio}</td>
                                <td>{item.fechaFin}</td>
                            </tbody>
                        </table>
                    </td>
                    <td colSpan="2" className="text-center">AVANCES</td>
                    <td className="text-center"><a href="/proyectos">Ver menos</a></td>
                </tr>
                </>
        )
        }})
        return pertenece
    })
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
    )}

export default Proyectos