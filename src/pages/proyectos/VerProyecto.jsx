import React, {useEffect} from 'react';
import {GET_PROYECTO} from '../../graphql/proyectos/queries';
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'

const VerProyecto=()=> {
    const { _id } = useParams();
    console.log ({ _id})
    const {data, error, loading} = useQuery(GET_PROYECTO, {variables:{ _id }});
    useEffect(() => {
        if (error) {
          console.log(error);;
        }
      }, [error]);
    if (loading) return <div>Cargando....</div>;
    return (
        <div className='w-full'>
            <div className ="">
                <h1 className="text-center uppercase">{data.Proyecto.nombre}</h1>
            </div>
            <div className='mx-4 grid grid-cols-2 gap-4'>
                <div className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2 '>
                    <h2 className='text-center col-span-4'> INFORMACION DEL PROYECTO</h2>
                    <div className='pl-3 grid grid-cols-4'>
                        <div className='col-start-1'>Lider:</div> <div className='col-start-2 col-span-3 uppercase'>{data.Proyecto.lider.nombre} {data.Proyecto.lider.apellido}</div>
                        <span className='col-start-1'>Presupuesto:</span> <span className='col-start-2 uppercase'>{data.Proyecto.presupuesto}</span>
                        <span className='col-start-1'>Fecha de Inicio:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fechaInicio}</span>
                        <span className='col-start-1'>Fecha de Finalizacion:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fechaFin}</span>
                        <span className='col-start-1'>Fase:</span> <span className='col-start-2 uppercase'>{data.Proyecto.fase}</span>
                        <span className='col-start-1'>Estado:</span> <span className='col-start-2 uppercase'>{data.Proyecto.estado}</span>
                    </div>
                </div>
                <div className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
                    <h2 className='text-center'> OBJETIVOS</h2>
                    <h3 className="pl-3">OBJETIVOS GENERALES</h3>
                    <ul className="pl-10">
                        <Objetivos item={data.Proyecto} tipo="GENERAL"/>
                    </ul>
                    <h3 className="pl-3">OBJETIVOS ESPECIFICOS</h3>
                    <ul className="pl-10">
                        <Objetivos item={data.Proyecto} tipo="ESPECIFICO"/>
                    </ul>
                </div>
                <div className='bg-blue-50 border-blue-500 border-solid border-2 col-start-1'>
                    <h2 className='text-center'>ESTUDIANTES INSCRITOS</h2>
                    <Estudiantes item={data.Proyecto}/>
                </div>
                <div className='bg-blue-50 border-blue-500 border-solid border-2 col-start-2'>
                    <h2 className='text-center'>AVANCES</h2>
                    <Avances item={data.Proyecto}/>
                </div>
            </div>
        </div>
    )
}

const Objetivos = ({item, tipo}) => {
    const Objetivos = item.objetivos.map((objetivo) => {
    if (objetivo.tipo===tipo) {
        return (
            <>
                <li className="list-disc">{objetivo.descripcion}</li>
            </>
        )
    } else return null
    })
    return Objetivos
}

const Estudiantes = ({item}) => {
    const Estudiantes = item.registros.map((estudiante) => {
    if (estudiante.estado==="ACEPTADA") {
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