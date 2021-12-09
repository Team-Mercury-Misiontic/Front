import React, { useEffect } from 'react';
import {useMutation} from '@apollo/client';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Usuario from '../../usuario.json';
import {NUEVO_PROYECTO} from '../../graphql/proyectos/mutations';
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';

const NuevoProyecto = () =>{
    const [crearProyecto,data,error] = useMutation(NUEVO_PROYECTO);
    const [objetivos,setObjetivos] = useState([]);
    const objetivo = {
        descripcion: "",
        tipo: ""
    };
    const handleClick = () => {
        setObjetivos([... objetivos, {descripcion: objetivo.descripcion.value, tipo: objetivo.tipo.value}])
    };
    const handleReset = () => {
        setObjetivos([]);
    };

    const [proyecto, setProyecto]=useState({
        nombre: "",
        lider: "",
        presupuesto: 0,
        fechaInicio: "",
        fechaFin: "",
    });
    if (error) {
        console.log(error.message);
    } 
    
    
    return(
        <>
        <header className="items-center justify-center p-3">
            <Link to='/Proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-1 text-3xl text-gray-800 font-bold text-center'>Crear Nuevo Proyecto</h1>
        </header>
        <section className="h-2/4 ">
            <form className="grid grid-cols-2 min-w-min w-10/12 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl " onSubmit={e=>{
                e.preventDefault();
                crearProyecto({variables:{
                    nombre: proyecto.nombre.value,
                    presupuesto: parseInt(proyecto.presupuesto.value),
                    fechaInicio: proyecto.fechaInicio.value,
                    fechaFin: proyecto.fechaFin.value,
                    lider: proyecto.lider,
                    objetivos: objetivos
                }})
                }}>
                <fieldset className="grid grid-cols-2 mt-6">
                    <label htmlFor="nombre" >Nombre</label>
                    <input ref={nombre=>setProyecto(proyecto.nombre = nombre)} placeholder="Nombre del proyecto" id="nombre" className="m-auto text-center rounded-md text-black text-lg "/>
                    <label htmlFor="lider" >Lider</label>
                    <input value = {Usuario.nombre + " " + Usuario.apellido} id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
                    <input ref={lider=>setProyecto(proyecto.lider=Usuario._id)} className="hidden"/>
                    <label htmlFor="presupuesto" >Presupuesto</label>
                    <input ref={presupuesto=>setProyecto(proyecto.presupuesto=presupuesto)} placeholder="Presupuesto"id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                    <label htmlFor="inicio" >Fecha de Inicio</label>
                    <input ref={fechaInicio=>setProyecto(proyecto.fechaInicio=fechaInicio)} type="date" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                    <label htmlFor="fin">Fecha de Finalizacion</label>
                    <input ref={fechaFin=>setProyecto(proyecto.fechaFin=fechaFin)} type="date" id="fin" className="m-auto text-center rounded-md text-black text-lg mb-3 "/>
                </fieldset>
                <fieldset className="grid grid-cols-2 mt-6 pr-6" >
                    <h2 className="col-span-2">OBJETIVOS</h2>
                    <div className="m-auto text-center rounded-md h-full w-11/12 text-gray-800 text-base col-span-2 bg-white row-span-3">
                        {objetivos.map((item)=>{
                            return (
                                <ul>
                                    <li className="list-disc list-inside text-left">{item.tipo}: {item.descripcion}</li>
                                </ul>
                        )})}
                    </div>
                    <label className="text-lg" htmlFor="descripcion">Descripcion</label>
                    <input className="border h-8" placeholder="Descripcion del objetivo" type="text-area" id="descripcion" ref={descripcion=>objetivo.descripcion=descripcion} />
                    <label className="text-lg" htmlFor="tipo">Tipo</label>
                    <select className="border h-8" type="text" id="tipo" ref={tipo=>objetivo.tipo=tipo} >
                        <option value="GENERAL">General</option>
                        <option value="ESPECIFICO">Especifico</option>
                    </select>
                    <button type="button" onClick={handleClick} className="m-auto col-span-2 block bg-green-400 hover:bg-green-600 rounded-full px-2 py-1 text-white">Añadir Objetivo</button>
                    <button type="button" onClick={handleReset} className="m-auto col-span-2 block bg-red-400 hover:bg-red-600 rounded-full px-2 py-1 text-white">Borrar Todo</button>
                </fieldset>
                <button type="submit"  className="m-auto col-span-2 block bg-indigo-400 hover:bg-indigo-600 rounded-full px-12 py-1 text-white">Crear Nuevo Proyecto</button>
            </form>
        </section>
        </>
    )
}
export default NuevoProyecto