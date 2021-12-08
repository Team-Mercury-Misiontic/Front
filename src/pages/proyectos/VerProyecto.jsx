import React, {useEffect, useState} from 'react';
import {GET_PROYECTO} from '../../graphql/proyectos/queries';
import {useParams} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client'
import Objetivos from 'components/Objetivos'
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';

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
            <InscripcionProyecto 
            idProyecto={data.Proyecto._id} 
            estado={data.Proyecto.estado}
            inscripciones={data.Proyectoinscripciones}
            />
        </div>
    )
}



const Estudiantes = ({item}) => {
    console.log('listado de estudiantes inscriptos',item)
    const Estudiantes = item.registros.map((estudiante) => {
    console.log('Verificando si esta autorizado',estudiante.estado)    
    if (estudiante.estado==="AUTORIZADO") {
        console.log('Verificando si esta autorizado',estudiante.estado)
        return (
            <ul className="pl-10">
                <li className="list-disc">{estudiante.estudiante.nombre} {estudiante.estudiante.apellido}</li>
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

const InscripcionProyecto = ({idProyecto, estado, inscripciones})=>{
    const [estadoInscripcion, setEstadoInscripcion] = useState('');
    const [crearRegistro, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
    //const {userData}= useUser();
    
    useEffect(() => {
        // if (userData && inscripciones) {
        if (inscripciones) {    
          const flt = inscripciones.filter((el) => el.estudiante._id === '61af74d5ba5adc3b57f4b11f');
          if (flt.length > 0) {
            setEstadoInscripcion(flt[0].estado);
          }
        }
      }, [inscripciones]);
    
    useEffect(()=>{
        if (data){
            console.log('datos de la inscripcion',data);
            // Swal({
            //     title: "Gestión de Proyectos",
            //     text: "Inscripción Exitosa",
            //     icon: "success",
            //     timer: "1000"
            // });
            toast.success("Registro Exitoso");
        }
    },[data]);

    const confirmarInscripcion = () => {
        crearRegistro({ variables: { proyecto: idProyecto, estudiante: '61af74d5ba5adc3b57f4b11f' } });
        //crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
      };

      return (
        <>
          {estadoInscripcion !== '' ? (
            <span>Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}</span>
          ) : (
            
            <ButtonLoading
              onClick={() => confirmarInscripcion()}
              disabled={estado === 'INACTIVO'}
              loading={loading}
              text='Inscribirme en este proyecto'
            />
          )}
        </>
      );
}

export default VerProyecto