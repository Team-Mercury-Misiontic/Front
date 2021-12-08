import React from 'react';
import {useMutation} from '@apollo/client';
import {useState} from 'react';
import Usuario from '../../usuario.json';
import {NUEVO_PROYECTO} from '../../graphql/proyectos/mutations';

const NuevoProyecto = () =>{
    const [crearProyecto] = useMutation(NUEVO_PROYECTO);
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
    
    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold">
                CREAR NUEVO PROYECTO
            </h1>
        </section>
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
                    <button type="button" onClick={handleClick} className="m-auto col-span-2 border-black border-2">Añadir Objetivo</button>
                    <button type="button" onClick={handleReset} className="m-auto col-span-2 border-black border-2">Borrar Todo</button>
                </fieldset>
                <button type="submit"  className="border-black border-2 h-8 col-span-full m-auto">Crear Nuevo Proyecto</button>
            </form>
        </section>
        </>
    )
}
export default NuevoProyecto