import Usuario from '../usuario.json'
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';


const Perfil = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const [editar,setEditar]=useState(false)

  const [Perfil, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('fd', formData);
    delete formData.rol;
    Perfil({
      variables: {...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/Usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>{Usuario.nombre} {Usuario.apellido}</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'
      >
        <span className='m-auto text-center rounded-md text-black text-lg'>{Usuario.rol}</span>
        <Input
          label='Identificación:'
          type='text'
          name='identificacion'
          defaultValue={Usuario.identificacion}
          required={true}
        />
        <Input
          label='Nombre'
          type='text'
          name='nombre'
          defaultValue={Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido'
          type='text'
          name='apellido'
          defaultValue={Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo'
          type='email'
          name='correo'
          defaultValue={Usuario.correo}
          required={true}
        />
        
        <Input
          label='Contraseña'
          type='password'
          name='contraseña'
          defaultValue={Usuario.contraseña}
          required={true}
        />{
            editar?
            <div>
            <button type='submit' className='inline-block bg-green-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-green-500 shadow-md my-4 mx-1 disabled:opacity-50 disabled:bg-gray-700' > Confirmar</button>
            <button type="button" className='inline-block bg-red-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-red-500 shadow-md my-4 mx-1 disabled:opacity-50 disabled:bg-gray-700'onClick={(e)=>setEditar(!editar)}>Cancelar</button>
            </div>
            :<button type="button" className='bg-indigo-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-indigo-500 shadow-md my-4 mx-4 disabled:opacity-50 disabled:bg-gray-700'onClick={(e)=>setEditar(!editar)}>Editar perfil</button>
        }
        
      </form>
    </div>
  );
};

export default Perfil;