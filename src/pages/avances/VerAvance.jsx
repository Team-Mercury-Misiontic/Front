import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_AVANCE_BY_PROJECT } from 'graphql/avances/queries';
import PrivateComponent from 'components/PrivateComponent';
import ReactLoading from 'react-loading';
import { ACTUALIZAR_AVANCE } from 'graphql/avances/mutations';

const VerAvance = () => {
  const { _id } = useParams();
  const { data, error, loading, refetch } = useQuery(GET_AVANCE_BY_PROJECT, {
    variables: { _id },
  });

  const [
    createAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ACTUALIZAR_AVANCE);

  useEffect(() => {
    if (mutationData) {
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error realizando creacion');
    }
  }, [mutationError]);

  // useEffect para datos traido del back
  useEffect(() => {
    refetch();
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los datos');
    }
  }, [error]);

  if (loading || mutationLoading)
    return (
      <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />
    );

  const addObservacion = (avanceId) => {
    const observacion = document.getElementsByName(`obs${avanceId._id}`)[0]
      .value;
    if (observacion) {
      createAvance({
        variables: {
          createAvanceId: avanceId._id,
          observaciones: observacion,
        },
      });
    }
  };

  return (
    <div>
      <div className='self-start p-10'>
        <Link to={`/proyectos/${_id}`}>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>
        Avances del proyecto {data.filtrarAvance[0].proyecto.nombre}
      </h1>
      <br />

      <div className='p-3'>
        <table className='tabla'>
          <thead>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Descripcion</th>
              <th scope='col'>Creado Por</th>
              <th scope='col'>Observaciones</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.filtrarAvance.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.fecha.split('T')[0]}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.creadoPor.nombre}</td>
                  <td>
                    <ul>
                      {item.observaciones.map((obs) => {
                        return <li key={obs}>{obs}</li>;
                      })}
                    </ul>
                  </td>
                  <PrivateComponent roleList={['LIDER']}>
                    <td>
                      <input
                        className='rounded-md	mb-2	border-2	border-blue-300	'
                        type='text'
                        name={`obs${item._id}`}
                      />{' '}
                      <br />
                      <button
                        type='button'
                        className='col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white'
                        onClick={() => addObservacion(item)}
                      >
                        Agregar Observacion
                      </button>
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={['ESTUDIANTE']}>
                    <td>
                      <Link to={`/VerAvance/ActualizarAvance/${item._id}`}>
                        <button
                          type='button'
                          className='col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white'
                        >
                          Editar
                        </button>{' '}
                      </Link>
                    </td>
                  </PrivateComponent>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerAvance;
