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

export default Perfil;