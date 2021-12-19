import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import {
  APROBAR_INSCRIPCION,
  RECHAZAR_INSCRIPCION,
} from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import PrivateRoute from 'components/PrivateRoute';

const IndexInscription = () => {
  const { data, loading, refetch } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {}, [data]);
  if (loading)
    return (
      <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />
    );
  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10'>
        <div>Pagina de inscripciones</div>
        <div className='my-4'>
          <AccordionInscripcion
            titulo='Inscripciones aprobadas'
            data={data.Inscripciones.filter((el) => el.estado === 'ACEPTADA')}
          />
          <AccordionInscripcion
            titulo='Inscripciones pendientes'
            data={data.Inscripciones.filter((el) => el.estado === 'PENDIENTE')}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo='Inscripciones rechazadas'
            data={data.Inscripciones.filter((el) => el.estado === 'RECHAZADA')}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => {
              return (
                <Inscripcion inscripcion={inscripcion} refetch={refetch} />
              );
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);
  const [rechazarInscripcion, { data: dataMutation, error: errorMutation }] =
    useMutation(RECHAZAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);

  useEffect(() => {
    if (dataMutation) {
      toast.success('Inscripcion rechazada');
      refetch();
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error('Error rechazando la inscripcion');
    }
  }, [errorMutation]);

  const cambiarEstadoInscripcion = (variable) => {
    if (variable === 0) {
      aprobarInscripcion({
        variables: {
          aprobarInscripcionId: inscripcion._id,
        },
      });
    } else {
      rechazarInscripcion({
        variables: {
          rechazarInscripcionId: inscripcion._id,
        },
      });
    }
  };

  return (
    <div className='bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
      <span>Proyecto {inscripcion.proyecto.nombre}</span>
      <span>{inscripcion.estudiante.nombre}</span>
      <span>{inscripcion.estado}</span>
      {inscripcion.estado === 'PENDIENTE' && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoInscripcion(0);
          }}
          text='Aprobar Inscripción'
          loading={loading}
          disabled={false}
        />
      )}
      {inscripcion.estado === 'PENDIENTE' && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoInscripcion(1);
          }}
          text='Rechazar Inscripción'
          loading={loading}
          disabled={false}
        />
      )}
    </div>
  );
};

export default IndexInscription;
