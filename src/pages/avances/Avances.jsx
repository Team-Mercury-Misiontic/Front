import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import useFormData from 'hooks/useFormData';
import{ Link } from "react-router-dom";
import Input from "components/Input";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import ReactLoading from 'react-loading';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Avances = () => {
  const { _id } = useParams();
  const {data: project, error, loading, refetch} = useQuery(GET_PROYECTO, {variables:{ _id }});
  const { form, formData, updateFormData } = useFormData();

  const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
  useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log("data servidor", project);
  }, [project]);

  useEffect(() => {
    if (error) {
      console.error(`error obteniendo los datos ${error}`);
      toast.error("Error consultando los datos");
    }
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.creadoPor = "61aed58d53d88c942ac9fda0";
    formData.proyecto = project.Proyecto._id;

    console.log('fd', formData);

    crearAvance({
      variables: formData,
    });
  }

  useEffect(() => {
    if (mutationData) {
      console.log(`Se ha creado con exito`);
      toast.success("Se ha creado con exito");
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      console.error(`error realizando creacion ${mutationError}`);
      toast.error("Error  realizando creacion");
    }
  }, [mutationError]);

  if (loading || mutationLoading) return <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Avance en {project.Proyecto.nombre}</h1>
      <form onSubmit={submitForm}
        onChange={updateFormData}
        ref={form} className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'>        
        <Input
          name="fecha"
          label="Fecha de actualización"
          required={true}
          type="date"
        />
        <Input
          name="descripcion"
          label="Descripción del avance"
          required={true}
          type="text"
        />
       
        <ButtonLoading text='Crear Avance' loading={false} disabled={false} />
      </form>
    </div>
  );
};

export default Avances;
