import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Input from "components/Input";
import { GET_AVANCES } from "graphql/avances/queries";
import ReactLoading from 'react-loading';

const Avances = () => {
  const {
    dataAvances,
    errorAvances,
    loadingAvances,
  } = useQuery(GET_AVANCES);

  useEffect(() => {
      console.log("Los datos son:");
      console.log(dataAvances);
  }, [dataAvances]);

  if (loadingAvances) return <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Avance</h1>
      <form>
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
      </form>
    </div>
  );
};

export default Avances;
