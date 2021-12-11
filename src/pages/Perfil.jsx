import { useUser } from 'context/userContext';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';


const Perfil = () => {
  const {userData} = useUser();
  const [editar,setEditar]=useState(false)
  const [editarUsuario, { data: mutationData}] =
    useMutation(EDITAR_USUARIO,{
      onCompleted() {
          toast.success("Usuario actualizado con exito");
      }});

  const usuario={
      _id: userData._id,
      nombre: userData.nombre,
      apellido:userData.apellido,
      identificacion: userData.identificacion,
      rol: userData.rol,
      estado: "AUTORIZADO",
      correo: userData.correo
  };
 console.log(usuario);
  useEffect(() => {
    if (mutationData) {
      toast.success('userData modificado correctamente');
    }
  }, [mutationData]);

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-4'>
      <header>
        <Link to=''>
          <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
        </Link>
      </header>
      <h1 className='mb-4 text-3xl text-gray-800 font-bold text-center'>{userData.nombre} {userData.apellido}</h1>
      <form className='flex flex-col gap-3 items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100 text-center text-xl text-gray-500 uppercase font-bold h-3/4 rounded-3xl'
            onSubmit={e => {
            e.preventDefault();
            editarUsuario({ 
              variables: { 
                _id: usuario._id,
                rol: usuario.rol,
                estado: usuario.estado,
                nombre: usuario.nombre.value,
                apellido: usuario.apellido.value,
                identificacion: usuario.identificacion.value,
                correo: usuario.correo.value
               }})
            }}>
        <span className=' m-auto text-center rounded-md text-black text-lg mt-8x'>{userData.rol}</span>
        <label htmlFor="nombre" className=' m-auto text-center rounded-md text-black text-lg'>Nombre:</label> 
        <input type='text' className={editar?"text-black":"text-center"}id='nombre' defaultValue={userData.nombre} ref={nombre=>usuario.nombre = nombre}/>
        <label htmlFor="apellido" className='m-auto text-center rounded-md text-black text-lg'>Apellido:</label> 
        <input type='text' id='apellido' className={editar?"text-black":"text-center"} defaultValue={userData.apellido} ref={apellido=>usuario.apellido = apellido}/>
        <label htmlFor="identificacion" className=' m-auto text-center rounded-md text-black text-lg'>Identificacion:</label> 
        <input type='text' id='identificacion' className={editar?"text-black":"text-center"} defaultValue={userData.identificacion} ref={identificacion=>usuario.identificacion = identificacion}/>
        <label htmlFor="correo" className='m-auto text-center rounded-md text-black text-lg'>Correo:</label> 
        <input type='text' id='correo' className={editar?"text-black":"text-center"} defaultValue={userData.correo} ref={correo=>usuario.correo = correo}/>
        {
            editar?
            <div>
            <button type='submit' className='inline-block bg-green-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-green-500 shadow-md my-4 mx-1 disabled:opacity-50 disabled:bg-gray-700'> Confirmar</button>
            <button type="button" className='inline-block bg-red-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-red-500 shadow-md my-4 mx-1 disabled:opacity-50 disabled:bg-gray-700'onClick={(e)=>setEditar(!editar)}>Cancelar</button>
            </div>
            :<button type="button" className='bg-indigo-700 text-white font-bold text-lg py-2 px-4  rounded-xl hover:bg-indigo-500 shadow-md my-4 mx-4 disabled:opacity-50 disabled:bg-gray-700'onClick={(e)=>setEditar(!editar)}>Editar perfil</button>
        }
        
      </form>
    </div>
  );
};

export default Perfil;