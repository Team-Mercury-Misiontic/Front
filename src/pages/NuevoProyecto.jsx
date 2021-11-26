import React from 'react';
import {useMutation} from '@apollo/client'
import {useState} from 'react'
import {NUEVO_PROYECTO} from '../graphql/proyectos/mutations'

const NuevoProyecto = () =>{
    const [crearProyecto] = useMutation(NUEVO_PROYECTO)
    const [proyecto, setProyecto]=useState({
        nombreProyecto:"",
        obejtivos:"",
        lider:"",
        identificacion:"",
        presupuesto:0,
        fechaInicio:"",
        fechaFin:""
    });

    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold uppercase">
                CREAR NUEVO PROYECTO
            </h1>
        </section>
        <section className="h-3/4 ">
            <form className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl" onSubmit={e=>{
                e.preventDefault();
                crearProyecto({variables:{
                    nombre: proyecto.nombreProyecto.value,
                    presupuesto: proyecto.presupuesto.value,
                    fechaInicio: proyecto.fechaInicio.value,
                    fechaFin: proyecto.fechaFin.value,
                    lider: proyecto.lider.value,
                    objetivos: proyecto.objetivos.value,
                }})
                }} >
                <label htmlFor="nombre">Nombre</label>
                <input ref={nombre=>setProyecto(proyecto.nombreProyecto=nombre)} placeholder="Nombre del proyecto" type="text" id="nombre" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="objetivo">Objetivos</label>
                <input ref={objetivos=>setProyecto(proyecto.objetivos=objetivos)} placeholder="Objetivos" type="text" id="objetivo" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="lider">Lider</label>
                <input ref={lider=>setProyecto(proyecto.lider=lider)} placeholder="Lider" type="text" id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
                {/* <input ref={estado=>setProyecto(proyecto.nombreProyecto=nombre)} placeholder="Nombre del proyecto" type="text" id="LiderId" className="m-auto text-center rounded-md text-black text-lg"/> */}
                <label htmlFor="presupuesto">Presupuesto</label>
                <input ref={presupuesto=>setProyecto(proyecto.presupuesto=presupuesto)} placeholder="Presupuesto" type="number" id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="inicio">Fecha de Inicio</label>
                <input ref={fechaInicio=>setProyecto(proyecto.fechaInicio=fechaInicio)} type="date" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="fin">Fecha de Finalizacion</label>
                <input ref={fechaFin=>setProyecto(proyecto.fechaFin=fechaFin)} type="date" id="fin" className="m-auto text-center rounded-md text-black text-lg pb-3"/>
                <button type="submit" className="border-black border-2">Crear Nuevo Proyecto </button>
            </form>
        </section>
        </>

    )
}
export default NuevoProyecto