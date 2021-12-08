import React, {useState, useEffect} from 'react';
import Usuario from 'usuario.json'
import {GET_PROYECTO} from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import Objetivos from 'components/Objetivos'

const EditarProyecto=()=> {
    const {_id} = useParams();
    const [objetivos,setObjetivos] = useState([]);
    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTO, {variables: {_id}});
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
    
    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PROYECTO)
    
    useEffect(() => {
      if (queryData) {
        queryData.Proyecto.objetivos.map((item)=>{
          /* console.log(item);
          console.log(item.descripcion);
          console.log(item.tipo); */
          setObjetivos([]);
        })
      }
    }, [queryData]);

    const handleClick = () => {
      setObjetivos([...objetivos, {descripcion: objetivo.descripcion.value, tipo: objetivo.tipo.value}])
    };
    
    const handleReset = () => {
      setObjetivos([]);
    }
    

    if (queryError) return `Error ${queryError}`
    if (queryLoading) return "Loading..."

    console.log(objetivos);

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

    if (mutationLoading) return 'Submitting...';
    if (mutationError) return `Submission error! ${mutationError.message}`;

    if (Usuario.rol === "LIDER") {
      return (
        <div className='w-full'>
          
        <header className="py-3">
          <h1 className="text-center uppercase font-extrabold text-3xl"> Editar Proyecto {queryData.Proyecto.nombre}</h1>
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
                    <div className='col-start-1 font-bold'>ID del proyecto:</div> <div className='col-start-2 col-span-3  uppercase'>{queryData.Proyecto._id}</div>
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <label htmlFor="nombre" className='col-start-1 font-bold'>Nombre:</label> 
                    <input className='col-start-2' type='text' id='nombre' defaultValue={queryData.Proyecto.nombre} ref={nombre=>proyecto.nombre = nombre}/>
                    <label htmlFor="presupuesto" className='col-start-1 font-bold'>Presupuesto:</label> 
                    <input className='col-start-2' type='text' id='presupuesto' defaultValue={queryData.Proyecto.presupuesto} ref={presupuesto=>proyecto.presupuesto = presupuesto}/>
                    <span className='col-start-1 font-bold'>Fecha de Inicio:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaInicio} </span>
                    <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaFin}</span>
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
                <button type="button" onClick={handleClick} className="m-auto col-span-2 border-black border-2">Añadir Objetivo</button>
                <button type="button" onClick={handleReset} className="m-auto col-span-2 border-black border-2">Borrar Todo</button>
              </div>
            </section>
            <button type="submit" className="border-black border-2">Modificar Todo</button>
        </form>
        </div>
      )
    } else if( Usuario.rol === "ADMINISTRADOR"){
      return (
        <div className='w-full'>
        <header className="py-3">
          <h1 className="text-center uppercase font-extrabold text-3xl"> Editar Proyecto {queryData.Proyecto.nombre}</h1>
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
                estado: proyecto.estado.value,
                fase: proyecto.fase.value
               }})
            }}>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
              <h2 className='text-center font-bold text-2xl col-span-4'> INFORMACION DEL PROYECTO</h2>
                <div className='pl-3 grid grid-cols-4'>
                    <div className='col-start-1 font-bold'>ID del proyecto:</div> <div className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto._id}</div>
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <span className='col-start-1 font-bold'>Nombre:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.nombre}</span>
                    <span className='col-start-1 font-bold'>Presupuesto:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.presupuesto}</span>
                    <span className='col-start-1 font-bold'>Fecha de Inicio:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaInicio} </span>
                    <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaFin}</span>
                    <label className='col-start-1 font-bold'>Fase:</label> 
                    <select  ref={fase=>proyecto.fase = fase}>
                      <option disabled value="NULA">Nula</option>
                      <option value="INICIADO">Iniciado</option>
                      <option value="DESARROLLO">Desarrollo</option>
                      <option value="TERMINADO">Terminado</option>
                    </select>
                    <label className='col-start-1 font-bold'>Estado:</label> 
                    <select  ref={estado=>proyecto.estado = estado}>
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
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
            <button type="submit" className="border-black border-2">Modificar Todo</button>
        </form>
        </div>
      )
    } else return "No tiene permisos para gestionar Proyectos"
}


export default EditarProyecto