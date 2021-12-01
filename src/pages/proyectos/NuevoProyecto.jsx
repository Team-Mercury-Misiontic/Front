import React from 'react';
import {useMutation} from '@apollo/client';
import {useState} from 'react';
import Usuario from '../../usuario.json';
import {Link} from 'react-router-dom';
import {NUEVO_PROYECTO} from '../../graphql/proyectos/mutations';

const NuevoProyecto = () =>{
    const [crearProyecto] = useMutation(NUEVO_PROYECTO);
    const [proyecto, setProyecto]=useState({
        nombreProyecto: "",
        lider: "",
        identificacion: "",
        presupuesto: 0,
        fechaInicio: "",
        fechaFin: ""
    });
    
    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold">
                CREAR NUEVO PROYECTO
            </h1>
        </section>
        <section className="h-3/4 ">
            <form className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl" onSubmit={e=>{
                e.preventDefault();
                crearProyecto({variables:{
                    nombre: proyecto.nombreProyecto.value,
                    presupuesto: parseInt(proyecto.presupuesto.value),
                    fechaInicio: proyecto.fechaInicio.value,
                    fechaFin: proyecto.fechaFin.value,
                    lider: proyecto.lider
                }})
                }} >
                <label htmlFor="nombre">Nombre</label>
                <input ref={nombre=>setProyecto(proyecto.nombreProyecto=nombre)} placeholder="Nombre del proyecto" id="nombre" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="lider">Lider</label>
                <input value = {Usuario.nombre + " " + Usuario.apellido} id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
                <input ref={lider=>setProyecto(proyecto.lider=Usuario._id)} className="hidden"/>
                <label htmlFor="presupuesto">Presupuesto</label>
                <input ref={presupuesto=>setProyecto(proyecto.presupuesto=presupuesto)} placeholder="Presupuesto"id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="inicio">Fecha de Inicio</label>
                <input ref={fechaInicio=>setProyecto(proyecto.fechaInicio=fechaInicio)} type="date" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="fin">Fecha de Finalizacion</label>
                <input ref={fechaFin=>setProyecto(proyecto.fechaFin=fechaFin)} type="date" id="fin" className="m-auto text-center rounded-md text-black text-lg mb-3"/>
                <button type="submit" className="border-black border-2">Crear Nuevo Proyecto</button>
            </form>
        </section>
        </>

    )
}

/* const CrearObjetivo = ({objetivo, setObjetivo}) => {
    const [crearObjetivo] = useMutation(NUEVO_OBJETIVO);
    ;
    return(
        <form onSubmit={e=>{
            e.preventDefault();
            crearObjetivo({variables:{
                descripcion: objetivo.descripcion.value,
                tipo: objetivo.tipo.value
            }})
            }}>
                <input ref={descripcion=>setObjetivo(objetivo.descripcion=descripcion)} placeholder="descripcion"/>
                <select ref={tipo=>setObjetivo(objetivo.tipo=tipo)}>
                    <option value="General"></option>
                    <option value="Especifico"></option>
                </select>
        </form>
    )
} */
export default NuevoProyecto