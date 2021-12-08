import React from 'react';
import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {REGISTRAR_USUARIO} from '../graphql/usuarios/mutations';

const NuevoUsuario = () =>{
    const [register] = useMutation(REGISTRAR_USUARIO);
    const [usuario, setUsuario]=useState({
        nombre: "",
        apellido: "",
        identificacion: "",
        correo: "",
        rol: "",
        password: "",
    });

    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold">
                REGISTRATE
            </h1>
        </section>
        <section className="h-3/4 ">
            <form className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl" onSubmit={e=>{
                e.preventDefault();
                register({variables:{
                    nombre: usuario.nombre.value,
                    apellido: usuario.apellido.value,
                    identificacion: usuario.identificacion.value,
                    correo: usuario.correo.value,
                    rol: usuario.rol.value,
                    password: usuario.password.value,
                }})
                }} >
                <label htmlFor="nombre">Nombre</label>
                <input ref={nombre=>setUsuario(usuario.nombre = nombre)} placeholder="Nombre" id="nombre" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="apellido">Apellido</label>
                <input  ref={apellido=>setUsuario(usuario.apellido = apellido)} id="apellido" placeholder="Apellido" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="identificacion">Identificacion</label>
                <input  ref={identificacion=>setUsuario(usuario.identificacion = identificacion)} placeholder="Identificacion" type="text" id="identificacion" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="inicio">Correo electronico</label>
                <input ref={correo=>setUsuario(usuario.correo=correo)} type="email" placeholder="Correo Electronico" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="rol">Rol</label>
                <select ref={rol=>setUsuario(usuario.rol=rol)} id="rol" className="m-auto text-center rounded-md text-black text-lg mb-3">
                    <option disabled selected>ELIJA SU ROL</option>
                    <option value="ESTUDIANTE">Estudiante</option>
                    <option value="LIDER">Lider</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                </select>
                <label htmlFor="password">Contraseña</label>
                <input ref={password=>setUsuario(usuario.password=password)} type="password" id="password" placeholder="Contraseña" className="m-auto text-center rounded-md text-black text-lg mb-3"/>
                <button type="submit"  className="border-black border-2">Registrate!</button>
            </form>
        </section>
        </>

    )
}

export default NuevoUsuario;