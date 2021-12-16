import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {NUEVO_PROYECTO} from '../../graphql/proyectos/mutations';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';

const NuevoProyecto = () =>{
  
    const [crearProyecto,{error, reset}] = useMutation(NUEVO_PROYECTO,{
        onCompleted() {
            toast.success("Proyecto Creado con exito");
            reset()
        }
      });
    const { userData } = useUser();
    console.log(userData);
    const [objetivos,setObjetivos] = useState([]);
    const objetivo = {
        descripcion: "",
        tipo: ""
    };
    const handleClick = () => {
        setObjetivos([...objetivos, {descripcion: objetivo.descripcion.value, tipo: objetivo.tipo.value}])
    };
    const handleReset = () => {
        setObjetivos([]);
    };

    const [proyecto, setProyecto]=useState({
        nombre: "",
        lider: "",
        presupuesto: 0
    });
    if (error) {
        console.log(error.message);
        toast.error("Problemas creando el proyecto");
    } 

    return(
        <PrivateRoute roleList={"LIDER"}>
        <header className="items-center justify-center p-3">
            <Link to='/Proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-1 text-3xl text-gray-800 font-bold text-center'>Crear Nuevo Proyecto</h1>
        </header>
        <section className="h-3/4">
            <form className="flex flex-col gap-2 min-w-min w-10/12 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl " onSubmit={e=>{
                e.preventDefault();
                crearProyecto({
                    variables:{
                        nombre: proyecto.nombre.value,
                        presupuesto: parseInt(proyecto.presupuesto.value),
                        lider: proyecto.lider,
                        objetivos: objetivos                
                    }})
                }}>
                    <label htmlFor="nombre" >Nombre</label>
                    <input ref={nombre=>setProyecto(proyecto.nombre = nombre)}  required placeholder="Nombre del proyecto" id="nombre" className="m-auto text-center rounded-md text-black text-lg "/>
                    <label htmlFor="lider" >Lider</label>
                    <input value = {userData.nombre + " " + userData.apellido} id="lider" required className="m-auto text-center rounded-md text-black text-lg"/>
                    <input ref={lider => setProyecto(proyecto.lider = userData._id)} className="hidden"/>
                    <label htmlFor="presupuesto" >Presupuesto</label>
                    <input ref={presupuesto=>setProyecto(proyecto.presupuesto=presupuesto)} required placeholder="Presupuesto"id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                    <placeholder className="grid grid-cols-4 gap-2">
                        <legend className="col-span-4">OBJETIVOS</legend>
                        <div className="m-auto col-start-1 h-36 text-center overflow-y-scroll rounded-md border-solid border-2 border-black w-11/12 text-gray-800 text-base col-span-2 row-span-5 bg-white overflow-hidden">
                            {objetivos.map((item)=>{
                                return (
                                    <ul>
                                        <li className="list-disc list-inside text-left">{item.tipo}: {item.descripcion}</li>
                                    </ul>
                            )})}
                        </div>
                        
                        <label className="text-lg text-left col-start-3" htmlFor="descripcion">Descripcion</label>
                        <input className="h-8 col-start-3 mx-3 col-span-2" required placeholder="Descripcion del objetivo" type="text-area" id="descripcion" ref={descripcion=>objetivo.descripcion=descripcion} />
                        <label className="text-lg text-left col-start-3" htmlFor="tipo">Tipo</label>
                        <select className="border h-8 col-start-3 mx-3 col-span-2" type="text" id="tipo" ref={tipo=>objetivo.tipo=tipo} >
                            <option value="GENERAL">General</option>
                            <option value="ESPECIFICO">Especifico</option>
                        </select>
                        <button type="button" onClick={handleClick} className="col-start-3 mx-auto bg-green-400 hover:bg-green-600 rounded-full px-2 py-1 text-white">Añadir Objetivo</button>
                        <button type="button" onClick={handleReset} className="col-start-4  mx-auto bg-red-400 hover:bg-red-600 rounded-full px-2 py-1 text-white">Borrar Todo</button>
                    </placeholder>

                <button type="submit"  className="m-auto col-span-2 block bg-indigo-400 hover:bg-indigo-600 rounded-full px-12 py-1 text-white">Crear Nuevo Proyecto</button>
            </form>
        </section>
        </PrivateRoute>
    )
}
export default NuevoProyecto