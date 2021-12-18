import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import ReactLoading from 'react-loading';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useUser } from 'context/userContext';

const Avances = () => {
  const { _id } = useParams();
  const { userData } = useUser();
  const {
    data: project,
    error,
    loading,
    refetch,
  } = useQuery(GET_PROYECTO, { variables: { _id } });
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto] = useMutation(EDITAR_PROYECTO);
  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log('data servidor', project);
  }, [project]);

  useEffect(() => {
    if (error) {
      console.error(`Error obteniendo los datos ${error}`);
      toast.error('Error consultando los datos');
    }
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.creadoPor = userData._id;
    formData.proyecto = project.Proyecto._id;

    console.log('fd', formData);
    console.log('project', project);
    crearAvance({
      variables: formData,
    });
    editarProyecto({
      variables: {
        _id: project.Proyecto._id,
        lider: project.Proyecto.lider._id,
        nombre: project.Proyecto.nombre,
        presupuesto: parseInt(project.Proyecto.presupuesto),
        estado: project.Proyecto.estado,
        fase: 'DESARROLLO',
      },
    });
  };

  useEffect(() => {
    if (mutationData) {
      console.log(`Se ha creado con éxito`);
      toast.success('Se ha creado con éxito');
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      console.error(`Error realizando creación ${mutationError}`);
      toast.error('Error  realizando creación');
    }
  }, [mutationError]);

  if (loading || mutationLoading)
    return (
      <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />
    );

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to={`/proyectos/${_id}`}>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>
        Crear Nuevo Avance en {project.Proyecto.nombre}
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'
      >
        <Input
          name='fecha'
          label='Fecha de actualización'
          required
          type='date'
        />
        <Input
          name='descripcion'
          label='Descripción del avance'
          required
          type='text'
        />

        <ButtonLoading text='Crear Avance' loading={false} disabled={false} />
      </form>
    </div>
  );
};

export default Avances;
