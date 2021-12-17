import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useUser } from 'context/userContext';
import {GET_PROYECTO} from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import Objetivos from 'components/Objetivos'
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { FECHA_FINAL } from 'graphql/inscripciones/mutaciones';

const EditarProyecto=()=> {
    const {_id} = useParams();
    const fechaHoy = new Date()
    const {userData} = useUser();
    const [objetivos,setObjetivos] = useState([]);
    const {data: queryData, error: queryError, loading: queryLoading, refetch} = useQuery(GET_PROYECTO, {variables: {_id}});
    let proyecto={
        _id: "",
        nombre: "",
        lider: "",
        presupuesto: "",
        fechaInicio: "",
        fechaFin: ""
    };
    const objetivo = {
      descripcion: "",
      tipo: ""
    };
    
    const [finalizarInscripcion, { data: dataMutation, loading: loadingMutation, error: errorMutation }] = useMutation(FECHA_FINAL)

    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PROYECTO)
    useEffect(() => {
      if (mutationData) {
        toast.success('Proyecto modificado correctamente');
        refetch();
      }}, [mutationData]);

    const handleClick = () => {
      setObjetivos([...objetivos, {descripcion: objetivo.descripcion.value, tipo: objetivo.tipo.value}])
    };
    
    const handleReset = () => {
      setObjetivos([]);
    }
    const handleActivar = () =>{
      if (queryData.Proyecto.fase==="NULA") {
          proyecto.fase = "INICIADO"
          proyecto.fechaInicio = `${fechaHoy}`
          proyecto.estado = "ACTIVO"
      }else{
        if (queryData.Proyecto.estado === "ACTIVO"){
          proyecto.estado = "INACTIVO"
          finalizarInscripcion({
            variables:{
            finalizarInscripcionId:_id
          }})
        }else {
          proyecto.estado = "ACTIVO"
        }
      };
    }
    
    if (queryError) return toast.error('Error al consultar los datos del proyecto');
    if (queryLoading) return <ReactLoading type="cylon" color="#4c2882" height={667} width={365}/>;

    proyecto={
        _id: queryData.Proyecto._id,
        nombre: queryData.Proyecto.nombre,
        lider:queryData.Proyecto.lider._id,
        presupuesto: queryData.Proyecto.presupuesto,
        fechaInicio: queryData.Proyecto.fechaInicio,
        fechaFin: queryData.Proyecto.fechaFin,
        estado: queryData.Proyecto.estado,
        fase: queryData.Proyecto.fase
    };
    if (mutationError) return toast.error('Error al modificar los datos del proyecto');

    if (userData.rol === "LIDER") {
      return (
        <div className='w-full'>
          <header className="items-center justify-center p-3">
            <Link to='/Proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-1 text-3xl text-gray-800 font-bold text-center'>Editar proyecto {queryData.Proyecto._id}</h1>
          </header>
        <form className='mx-4 grid grid-cols-2 gap-4'
            onSubmit={e => {
            e.preventDefault();
            editarProyecto({ 
              variables: { 
                _id: proyecto._id,
                lider: proyecto.lider,
                nombre: proyecto.nombre.value,
                presupuesto: parseInt(proyecto.presupuesto.value),
                fechaInicio: proyecto.fechaInicio,
                fechaFin: proyecto.fechaFin,
                estado: proyecto.estado,
                fase: proyecto.fase,
                objetivos: objetivos
               }})
            }}>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
              <h2 className='text-center font-bold text-2xl col-span-4'> INFORMACION DEL PROYECTO</h2>
                <div className='pl-3 grid grid-cols-4'>
                    <span className='col-start-1 font-bold'>ID del proyecto:</span> <span className='col-start-2 col-span-3'>{queryData.Proyecto._id}</span>
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <label htmlFor="nombre" className='col-start-1 font-bold'>Nombre:</label> 
                    <input className='col-start-2' type='text' id='nombre' defaultValue={queryData.Proyecto.nombre} ref={nombre=>proyecto.nombre = nombre}/>
                    <label htmlFor="presupuesto" className='col-start-1 font-bold'>Presupuesto:</label> 
                    <input className='col-start-2' type='text' id='presupuesto' defaultValue={queryData.Proyecto.presupuesto} ref={presupuesto=>proyecto.presupuesto = presupuesto}/>
                    <span className='col-start-1 font-bold'>Fecha de Inicio:</span> 
                    <span className='col-start-2 uppercase'>
                      {queryData.Proyecto.fechaInicio === null
                      ? "EL PROYECTO AUN NO TERMINADO"
                      : queryData.Proyecto.fechaInicio}
                      </span>
                    <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> 
                    <span className='col-start-2 uppercase'>
                    {queryData.Proyecto.fechaFin === null
                      ? "EL PROYECTO AUN NO TERMINADO"
                      : queryData.Proyecto.fechaFin}
                      </span>
                    <span className='col-start-1 font-bold'>Fase:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fase}</span>
                    <span className='col-start-1 font-bold'>Estado:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.estado}</span>
              </div>
            
            </section>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-4 grid grid-cols-2'>
              <h2 className='text-center font-bold text-xl col-span-2'> OBJETIVOS</h2>
              <div>
                <h3 className="pl-3 font-bold">OBJETIVOS GENERALES</h3>
                <ul className="pl-10">
                    <Objetivos item={queryData.Proyecto} tipo="GENERAL"/>
                </ul>
                <h3 className="pl-3 font-bold">OBJETIVOS ESPECIFICOS</h3>
                <ul className="pl-10">
                    <Objetivos item={queryData.Proyecto} tipo="ESPECIFICO"/>
                </ul>
              </div>
               <div className="h-full">
                <div className="m-auto text-center rounded-md w-11/12 text-gray-800 text-base col-span-2 bg-white row-span-3">
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
                <div>
                    <button type="button" onClick={handleClick} className="m-auto col-span-2 bg-green-400 rounded-full px-2 py-1 my-2 shadow-md hover:bg-green-600 text-white">Añadir Objetivo</button>
                    <button type="button" onClick={handleReset} className="m-auto col-span-2 bg-red-400 rounded-full px-2 py-1 shadow-md hover:bg-red-600 text-white">Borrar Todo</button>
                </div>
              </div>
            </section>
            <button type="submit" className="bg-indigo-700 text-white font-bold text-lg py-1 px-6 rounded-xl hover:bg-indigo-500 shadow-md mx-4 disabled:opacity-50 disabled:bg-gray-700">Modificar Todo</button>
        </form>
        </div>
      )
    } else if( userData.rol === "ADMINISTRADOR"){
      return (
      <div className='w-full'>
        <header className="items-center justify-center p-3">
            <Link to='/Proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-1 text-3xl text-gray-800 font-bold text-center'>Editar proyecto {queryData.Proyecto._id}</h1>
        </header>
        <form className='mx-4 grid grid-cols-2 gap-4'
            onSubmit={e => {
            e.preventDefault();
            editarProyecto({ 
              variables: { 
                _id: proyecto._id,
                lider: proyecto.lider,
                nombre: proyecto.nombre,
                presupuesto: parseInt(proyecto.presupuesto),
                fechaInicio: proyecto.fechaInicio,
                fechaFin: proyecto.fechaFin,
                estado: proyecto.estado,
                fase: proyecto.fase
               }})
            }}>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
              <h2 className='text-center font-bold text-2xl col-span-4'> INFORMACION DEL PROYECTO</h2>
                <div className='pl-3 grid grid-cols-4'>
                    <div className='col-start-1 font-bold'>ID del proyecto:</div> <div className='col-start-2 col-span-3'>{queryData.Proyecto._id}</div>
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <span className='col-start-1 font-bold'>Nombre del proyecto:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.nombre}</span>
                    <span className='col-start-1 font-bold'>Presupuesto:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.presupuesto}</span>
                    <span className='col-start-1 font-bold'>Fecha de Inicio:</span> 
                    <span className='col-start-2 uppercase'>
                      {queryData.Proyecto.fechaInicio === null
                      ? "EL PROYECTO AUN NO TERMINADO"
                      : queryData.Proyecto.fechaInicio}
                      </span>
                    <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> 
                    <span className='col-start-2 uppercase'>
                    {queryData.Proyecto.fechaFin === null
                      ? "EL PROYECTO AUN NO TERMINADO"
                      : queryData.Proyecto.fechaFin}
                      </span>
                    <span className='col-start-1 font-bold'>Fase:</span> <span className='col-start-2'>{queryData.Proyecto.fase}</span> 
                    <label className='col-start-1 font-bold'>Estado:</label> <span className='col-start-2 pb-2'>{queryData.Proyecto.estado}</span> 
                    {queryData.Proyecto.fase==="TERMINADO"?null:
                      <button type="submit" onClick={handleActivar} className="col-start-3 bg-blue-700 text-white font-bold text-lg px-5 rounded-xl hover:bg-blue-500 shadow-md mx-4 mb-3 disabled:opacity-50 disabled:bg-gray-700">
                      {queryData.Proyecto.estado==="ACTIVO"?"Desactivar":"Activar"}</button>}
                    
              </div>
            </section>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-4 grid grid-cols-2'>
              <div>
                <h2 className='text-center font-bold text-xl'> OBJETIVOS</h2>
                <h3 className="pl-3 font-bold">OBJETIVOS GENERALES</h3>
                <ul className="pl-10">
                    <Objetivos item={queryData.Proyecto} tipo="GENERAL"/>
                </ul>
                <h3 className="pl-3 font-bold">OBJETIVOS ESPECIFICOS</h3>
                <ul className="pl-10">
                    <Objetivos item={queryData.Proyecto} tipo="ESPECIFICO"/>
                </ul>
              </div>
            </section>
            {queryData.Proyecto.fase === "DESARROLLO"? 
            <button type="submit" className="bg-red-700 text-white font-bold text-lg py-1 px-6 rounded-xl hover:bg-red-500 shadow-md mx-4 disabled:opacity-50 disabled:bg-gray-700  " onClick={e=>{proyecto.estado = "INACTIVO"; proyecto.fase = "TERMINADO"; proyecto.fechaFin = `${fechaHoy}`; }}> Terminar Proyecto </button>:null}
            
        </form>
      </div>
      )
    } else return "No tiene permisos para gestionar Proyectos"
}

export default EditarProyecto