import React, {useEffect} from 'react';
import {GET_PROYECTO} from '../../graphql/proyectos/queries';
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import Objetivos from 'components/Objetivos'

const VerProyecto=()=> {
    const { _id } = useParams();
    const {data, error, loading} = useQuery(GET_PROYECTO, {variables:{ _id }});
    useEffect(() => {
        if (error) {
          console.log(error);
        }
      }, [error]);
    if (loading) return <div>Cargando....</div>;
    return (
        <div className='w-full'>
            <header className="py-3">
                <h1 className="text-center uppercase font-extrabold text-3xl ">{data.Proyecto.nombre}</h1>
            </header>
            <div className='mx-4 grid grid-cols-2 gap-4'>
                <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-2'>
                    <h2 className='text-center font-bold text-2xl col-span-4 mb-2'> INFORMACION DEL PROYECTO</h2>
                    <div className='pl-3 grid grid-cols-4'>
                        <div className='col-start-1 font-bold'>ID del proyecto:</div> <div className='col-start-2 col-span-3 uppercase'>{data.Proyecto._id}</div>
                        <div className='col-start-1 font-bold'>Lider:</div> <div className='col-start-2 col-span-3 uppercase'>{data.Proyecto.lider.nombre} {data.Proyecto.lider.apellido}</div>
                        <span className='col-start-1 font-bold'>Presupuesto:</span> <span className='col-start-2 uppercase'>{data.Proyecto.presupuesto}</span>
                        <span className='col-start-1 font-bold'>Fecha de Inicio:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fechaInicio}</span>
                        <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fechaFin}</span>
                        <span className='col-start-1 font-bold'>Fase:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fase}</span>
                        <span className='col-start-1 font-bold'>Estado:</span> <span className='col-start-2 uppercase'>{data.Proyecto.estado}</span>
                    </div>
                </section>
                <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-4'>
                    <h2 className='text-center font-bold text-xl'> OBJETIVOS</h2>
                    <h3 className="pl-3 font-bold">OBJETIVOS GENERALES</h3>
                    <ul className="pl-10">
                        <Objetivos item={data.Proyecto} tipo="GENERAL" className="list-disc"/>
                    </ul>
                    <h3 className="pl-3 font-bold">OBJETIVOS ESPECIFICOS</h3>
                    <ul className="pl-10">
                        <Objetivos item={data.Proyecto} tipo="ESPECIFICO" className="list-disc"/>
                    </ul>
                </section>
                <section className='bg-blue-50 border-blue-500 border-solid border-2 col-start-1 py-4'>
                    <h2 className='text-center font-bold text-l'>ESTUDIANTES INSCRITOS</h2>
                    <Estudiantes item={data.Proyecto}/>
                    <button>Inscribirse</button>
                </section>
                <section className='bg-blue-50 border-blue-500 border-solid border-2 col-start-2 py-4'>
                    <h2 className='text-center font-bold text-l'>AVANCES</h2>
                    <Avances item={data.Proyecto}/>
                    <button>Añadir Avance</button>
                </section>
            </div>
        </div>
    )
}



const Estudiantes = ({item}) => {
    console.log(item)
    const Estudiantes = item.registros.map((estudiante) => {
    if (estudiante.estado==="AUTORIZADO") {
        console.log(estudiante.estado)
        return (
            <ul className="pl-10">
                <li className="list-disc">{estudiante.estudiante.nombre} {estudiante.estudiante.nombre}</li>
            </ul>
        )
    } else return null
    })
    console.log(Estudiantes);
    if (Estudiantes.length !== 0) {
        return Estudiantes
    } else return <p className="text-center">NO HAY ESTUDIANTES REGISTRADOS AL PROYECTO </p>
}

const Avances = ({item}) => {
    const Avances = item.avances.map((avance) => {
    return (
        <>
        <tr>
            <td>{avance.descripcion}</td>
            <td>{avance.creadoPor.nombre}{avance.creadoPor.apellido}</td>
            <td>{avance.fecha}</td>
            <td>{avance.objetivos}</td>
        </tr>
        </>
    )})
    console.log(Avances);
    if (Avances.length !== 0) {
        return (
            <table className="tabla">
                <thead>
                    <tr>
                        <td>Descripcion</td>
                        <td>Estudiante</td>
                        <td>Fecha</td>
                        <td>Comentarios</td>
                    </tr>
                </thead>
                <tbody>
                
                    {Avances}
                </tbody>    
            </table>
        )
    } else return <p className="text-center">NO HAY AVANCES EN EL PROYECTO </p>
}

export default VerProyecto