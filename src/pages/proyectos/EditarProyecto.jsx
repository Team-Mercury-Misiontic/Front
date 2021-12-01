import React, {useState} from 'react';
import {GET_PROYECTO} from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import {useParams} from 'react-router-dom';
import Usuario from '../../usuario.json';
import { Enum_FaseProyecto , Enum_EstadoProyecto } from 'utils/enum';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import DropDown from 'components/Dropdown';
import {useQuery, useMutation} from '@apollo/client';

const EditarProyecto=()=> {
    const { form, formData, updateFormData } = useFormData(null);
    const {_id} = useParams();
    
    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTO, {variables: {_id}});
    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PROYECTO);

    if (queryLoading) return 'Loading...';
    console.log(queryData.Proyecto)

    const submitForm = (e) => {
      e.preventDefault();
      console.log('fd', formData);
      editarProyecto({
        variables: { 
          _id,
          fase: queryData.Proyecto.fase,
          estado: queryData.Proyecto.estado,
          lider: Usuario._id,
          ...formData },
      });
    };
    
    if (queryError) return `Error! ${queryError.message}`;
    if (mutationLoading) return 'Submitting...';
    if (mutationError) return `Submission error! ${mutationError.message}`;

    return (
      <div className='w-full'>
        <div className='mx-4 grid grid-cols-2 gap-4'>
        <form className="bg-blue-50 border-blue-500 border-solid border-2 col-span-2 grid grid-cols-4"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          >
          <h2 className='text-center col-span-4'> INFORMACION DEL PROYECTO</h2>
          <label htmlFor="nombre">Nombre</label>
            <Input
            label=''
            type='text'
            name='nombre'
            defaultValue={queryData.Proyecto.nombre}
            required={true}
            />
          <label htmlFor="lider">Lider</label>
            <input value = {Usuario._id} id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
          <label htmlFor="presupuesto">Presupuesto</label>
            <Input
            label=''
            type='number'
            name='presupuesto'
            defaultValue={queryData.Proyecto.presupuesto}
            required={true}
            />
          <label htmlFor="inicio">Fecha de Inicio</label>
            <Input
              label=''
              type='date'
              name='inicio'
              defaultValue={queryData.Proyecto.fechaInicio}
              required={true}
            />
          <label htmlFor="fin">Fecha de Finalizacion</label>
            <Input
              label=''
              type='date'
              name='fin'
              defaultValue={queryData.Proyecto.fechaFin}
              required={true}
            />
         <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
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