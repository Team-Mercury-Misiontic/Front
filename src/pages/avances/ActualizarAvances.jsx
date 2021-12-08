import { useQuery, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import ButtonLoading from 'components/ButtonLoading';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { GET_AVANCE } from 'graphql/avances/queries';
import { ACTUALIZAR_AVANCE } from 'graphql/avances/mutations';

const ActualizarAvances = () => {
 /*    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

  const { dataUsuario: queryDataUsuario, errorUsuario: queryErrorUsuario, loadingUsuario: queryLoadingUsuario, } = useQuery(GET_USUARIO, {
    variables: { _id },
  });
  const { dataProyecto: queryDataProyecto, errorProyecto: queryErrorProyecto, loadingProyecto: queryLoadingProyecto, } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });
  const { dataAvances: queryDataAvances, errorAvances: queryErrorAvances, loadingAvances: queryLoadingAvances, } = useQuery(GET_AVANCE, {
    variables: { _id },
  });

  const [actualizarAvance, { dataAvances: mutationDataAvances, loadingAvances: mutationLoadingAvances, errorAvances: mutationErrorAvances }] =
    useMutation(ACTUALIZAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('fd', formData);
    actualizarAvance({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationDataAvances) {
      toast.success('Avance actualizado correctamente');
    }
  }, [mutationDataAvances]);

  useEffect(() => {
    if (mutationErrorAvances) {
      toast.error('Error actalizando avances');
    }

    if (queryErrorUsuario) {
      toast.error('Error consultando el usuario');
    }

    if (queryErrorProyecto) {
        toast.error('Error consultando el proyecto');
    }
    
    if (queryErrorAvances) {
        toast.error('Error consultando los avances');
    }
  }, [queryErrorAvances, mutationErrorAvances, queryErrorProyecto, queryErrorUsuario]);

  if (queryLoadingUsuario || queryLoadingProyecto || queryLoadingAvances) return <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/Proyectos/:_id}'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Actualizar Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'
      >
        <span className='m-auto text-center rounded-md text-black text-lg'>Proyecto: {queryDataProyecto.Proyecto.nombre}</span>
        <Input
          label='Fecha:'
          type="date"
          name="date"
          value={queryDataAvances.Avance.fecha.split("T")[0]}
          required={true}
        />
        <Input
          label='Descripción del avance:'
          type='text'
          name='descripcion'
          defaultValue={queryDataAvances.Avance.descripcion}
          required={true}
        />
        <Input
          label='Creado por:'
          type='text'
          name='creadoPor'
          defaultValue={queryDataUsuario.Usuario.nombre && queryDataUsuario.Usuario.apellido}
          required={true}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoadingAvances}
          text='Confirmar'
        />
      </form>
    </div>
  ); */
    return(
      <div>
            Editar avance
        </div>
    )

}

export default ActualizarAvances
