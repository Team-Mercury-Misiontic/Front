import React, {useState} from 'react';
import {GET_PROYECTO} from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import {useParams} from 'react-router-dom';
import Usuario from '../../usuario.json';
import { Enum_FaseProyecto , Enum_EstadoProyecto } from 'utils/enum';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import DropDown from 'components/DropDown';
import {useQuery, useMutation} from '@apollo/client';

const EditarProyecto=()=> {
    const {_id} = useParams();
    
    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTO, {variables: {_id}});
    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PROYECTO);

    const [proyecto,setProyecto] = useState({
      _id: queryData.Proyecto._id,
      nombre: queryData.Proyecto.nombre,
      presupuesto: queryData.Proyecto.presupuesto,
      fechaInicio: queryData.Proyecto.fechaInicio,
      fechaFin: queryData.Proyecto.fechaFin,
      estado: queryData.Proyecto.estado,
      fase: queryData.Proyecto.fase,
      lider: queryData.Proyecto.lider,
    })

    if (queryLoading) return 'Loading...';
    if (queryError) return `Error! ${queryError.message}`;
    if (mutationLoading) return 'Submitting...';
    if (mutationError) return `Submission error! ${mutationError.message}`;

    console.log(proyecto);
    return (
      <div className='w-full'>
        <div className='mx-4 grid grid-cols-2 gap-4'>
        <form className="bg-blue-50 border-blue-500 border-solid border-2 col-span-2 grid grid-cols-4"
          onSubmit={e => {
          e.preventDefault();
          editarProyecto({variables:{
            _id: proyecto._id,
            nombre: proyecto.nombre,
            presupuesto: proyecto.presupuesto,
            fechaInicio: proyecto.fechaInicio,
            fechaFin: proyecto.fechaFin,
            estado: proyecto.estado,
            fase: proyecto.fase,
            lider: proyecto.lider,
          }})}}
          >
          <h2 className='text-center col-span-4'> INFORMACION DEL PROYECTO</h2>
          <label htmlFor="nombre">Nombre</label>
                <input ref={nombre=>setProyecto(proyecto.nombreProyecto=nombre)} placeholder="Nombre del proyecto" id="nombre" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="lider">Lider</label>
                <input value = {Usuario._id} placeholder="Lider" id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="presupuesto">Presupuesto</label>
                <input ref={presupuesto=>setProyecto(proyecto.presupuesto=presupuesto)} placeholder="Presupuesto"id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="inicio">Fecha de Inicio</label>
                <input ref={fechaInicio=>setProyecto(proyecto.fechaInicio=fechaInicio)} type="date" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="fin">Fecha de Finalizacion</label>
                <input ref={fechaFin=>setProyecto(proyecto.fechaFin=fechaFin)} type="date" id="fin" className="m-auto text-center rounded-md text-black text-lg pb-3"/>
                <button type="submit" className="border-black border-2">Crear Nuevo Proyecto</button>
        </form>
        <div className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
          <h2 className='text-center'> OBJETIVOS</h2>
          <h3 className="pl-3">OBJETIVOS GENERALES</h3>
          <ul className="pl-10">
              {/* <Objetivos item={data.Proyecto} tipo="GENERAL"/> */}
          </ul>
          <h3 className="pl-3">OBJETIVOS ESPECIFICOS</h3>
          <ul className="pl-10">
            {/* <Objetivos item={data.Proyecto} tipo="ESPECIFICO"/> */}
          </ul>
        </div>
        <div className='bg-blue-50 border-blue-500 border-solid border-2 col-start-1'>
          <h2 className='text-center'>ESTUDIANTES INSCRITOS</h2>
          {/* <Estudiantes item={data.Proyecto}/> */}
        </div>
        <div className='bg-blue-50 border-blue-500 border-solid border-2 col-start-2'>
          <h2 className='text-center'>AVANCES</h2>
          {/* <Avances item={data.Proyecto}/> */}
        </div>
        </div>
      </div>
    ); 
}

export default EditarProyecto