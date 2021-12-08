import { useState } from 'react';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import usuario from "../usuario.json";

const Perfil = () =>{
    const[editar,setEditar]=useState(false)
    if (editar === true) {
        return(
            <div className="h-full">
                <Datos editar={editar} />
                <button className="bg-green-300 w-20 h-10 rounded-xl hover:bg-green-400 relative left-96 mt-3" >Aceptar </button>
                <button className="bg-red-300 w-20 h-10 rounded-xl hover:bg-red-400 absolute right-96 mt-3" onClick={()=>{setEditar(false)}}>Cancelar</button>
            </div>)
    } else {
        return(
            <div className="h-full">
                <Datos editar={editar} />
                <button className="bg-blue-300 w-20 h-10 rounded-xl hover:bg-blue-400 relative inset-x-2/4 mt-3"  onClick={()=>{setEditar(true)}}>Editar</button>
            </div>)        
    }              
}

const Datos = ({editar}) =>{
    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold uppercase">
                {usuario.nombre + " " + usuario.apellido}
            </h1>
        </section>
        <section className="h-2/3 ">
            <form className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold  h-full rounded-3xl">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" className="m-auto text-center rounded-md text-black text-lg" value={editar?null:usuario.nombre} />
                <label htmlFor="apellido">Apellido</label>
                <input  type="text" id="apellido" className="m-auto text-center rounded-md text-black text-lg" value={editar?null:usuario.apellido}/>
                <label htmlFor="identificacion">Identificacion</label>
                <input  type="text" id="identificacion" className="m-auto text-center rounded-md text-black text-lg" value={editar?null:usuario.identificacion}/>
                <label htmlFor="correo">Correo</label>
                <input  type="text" id="correo" className="m-auto text-center rounded-md text-black text-lg" value={usuario.correo}/>
                <label htmlFor="rol">Rol de Usuario</label>
                <input  type="text" id="rol" className="m-auto text-center rounded-md text-black text-lg" value={usuario.rol}/>
                <label htmlFor="contraseña">Contraseña</label>
                <input  type="password" id="contraseña" className="m-auto text-center rounded-md text-black text-lg" value={editar?null:usuario.contraseña}/>              
            </form>
        </section>
        </>

    )
}
/* import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ReactLoading from 'react-loading';

const Perfil = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  console.log(queryData);

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('fd', formData);
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/Usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'
      >
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <span className='m-auto text-center rounded-md text-black text-lg'>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
}; */

export default Perfil;