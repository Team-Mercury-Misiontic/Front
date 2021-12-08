import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Input from "components/Input";
import useFormData from 'hooks/useFormData';
import { GET_AVANCES } from "graphql/avances/queries";
import ReactLoading from 'react-loading';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from "react-toastify";

const Avances = () => {
  const { form, formData, updateFormData } = useFormData();
  const {
    data,
    error,
    loading
  } = useQuery(GET_AVANCES);

  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(`error obteniendo los datos ${error}`);
      toast.error("Error consultando los datos");
    }
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const fechaActual = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return dd+"/"+mm+"/"+yyyy;
  }

  if (loading) return <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Avance</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm} className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl'>
        <Input
          name="proyecto"
          label="Nombre del proyecto"
          required={true}
          type="text"
        />
        <Input
          name="fecha"
          label="Fecha de actualización"
          required={true}
          type="date"
          defaultValue = {fechaActual()}
        />
        <Input
          name="descripcion"
          label="Descripción del avance"
          required={true}
          type="text"
        />
        <Input
          name="creadoPor"
          label="Creado por:"
          defaultValue="Laura"
          readOnly="readOnly"
          type="text"
        />
        <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
      </form>
    </div>
  );
};

export default Avances;
