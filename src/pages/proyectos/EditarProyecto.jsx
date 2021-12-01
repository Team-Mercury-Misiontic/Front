import React from 'react';
import Usuario from 'usuario.json'
import {GET_PROYECTO} from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import {useParams} from 'react-router-dom';
import { Enum_FaseProyecto , Enum_EstadoProyecto } from 'utils/enum';
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import {useQuery, useMutation} from '@apollo/client';

const EditarProyecto=()=> {
    const {_id} = useParams();
    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTO, {variables: {_id}});
    let proyecto={
        _id: "",
        nombre: "",
        lider: "",
        presupuesto: "",
        fechaInicio: "",
        fechaFin: ""
    };
    
    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PROYECTO)
    
    if (queryError) return `Error ${queryError}`
    if (queryLoading) return "Loading..."

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
    console.log(mutationData);

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
                fechaInicio: proyecto.fechaInicio.value,
                fechaFin: proyecto.fechaFin.value,
                estado: proyecto.estado,
                fase: proyecto.fase
               }})
            }}>
            <section className='bg-blue-50 border-blue-500 border-solid border-2 col-span-2'>
              <h2 className='text-center font-bold text-2xl col-span-4'> INFORMACION DEL PROYECTO</h2>
                <div className='pl-3 grid grid-cols-4'>
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <label htmlFor="nombre" className='col-start-1 font-bold'>Nombre:</label> 
                    <input className='col-start-2' type='text' id='nombre' defaultValue={queryData.Proyecto.nombre} ref={nombre=>proyecto.nombre = nombre}/>
                    <label htmlFor="presupuesto" className='col-start-1 font-bold'>Presupuesto:</label> 
                    <input className='col-start-2' type='text' id='presupuesto' defaultValue={queryData.Proyecto.presupuesto} ref={presupuesto=>proyecto.presupuesto = presupuesto}/>
                    <label htmlFor="inicio" className='col-start-1 font-bold'>Fecha de Inicio:</label> <input className='col-start-2 uppercase' type="date" id="inicio" defaultValue={queryData.Proyecto.fechaInicio} ref={fechaInicio=>proyecto.fechaInicio = fechaInicio}/>
                    <label htmlFor="fin" className='col-start-1 font-bold'>Fecha de Finalizacion:</label> <input className='col-start-2 uppercase' type="date" id="fin" defaultValue={queryData.Proyecto.fechaFin} ref={fechaFin=>proyecto.fechaFin = fechaFin}/>
                    <span className='col-start-1 font-bold'>Fase:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fase}</span>
                    <span className='col-start-1 font-bold'>Estado:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.estado}</span>
              </div>
            <button type="submit" className="border-black border-2">Modificar Todo</button>
            </section>
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
                    <span className='col-start-1 font-bold'>Lider:</span> <span className='col-start-2 col-span-3 uppercase'>{queryData.Proyecto.lider.nombre} {queryData.Proyecto.lider.apellido}</span>
                    <span className='col-start-1 font-bold'>Nombre:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.nombre}</span>
                    <span className='col-start-1 font-bold'>Presupuesto:</span> 
                    <span className='col-start-2'>{queryData.Proyecto.presupuesto}</span>
                    <span className='col-start-1 font-bold'>Fecha de Inicio:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaInicio} </span>
                    <span className='col-start-1 font-bold'>Fecha de Finalizacion:</span> <span className='col-start-2 uppercase'>{queryData.Proyecto.fechaFin}</span>
                    <label className='col-start-1 font-bold'>Fase:</label> 
                    <DropDown
                        defaultValue={queryData.Proyecto.fase}
                        required={false}
                        options={Enum_FaseProyecto}
                      />
                    <label className='col-start-1 font-bold'>Estado:</label> 
                    <DropDown
                        defaultValue={queryData.Proyecto.estado}
                        required={false}
                        options={Enum_EstadoProyecto}
                      />
              </div>
            <button type="submit" className="border-black border-2">Modificar Todo</button>
            </section>
        </form>
        </div>
      )
    } else return "No tiene permisos para gestionar Proyectos"
}


export default EditarProyecto