import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { GET_AVANCE_BY_PROJECT } from "graphql/avances/queries";
import ReactLoading from "react-loading";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { useUser } from "context/userContext";

const ActualizarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const { userData } = useUser();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCE_BY_PROJECT, { variables: { _id } });

  console.log(queryData);

  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    delete formData.rol;
    crearAvance({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Avance modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el avance");
    }

    if (queryError) {
      toast.error("Error consultando el avance");
    }
  }, [queryError, mutationError]);

  if (queryLoading)
    return (
      <ReactLoading type="cylon" color="#4c2882" height={667} width={365} />
    );

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to={`/VerAvance/${_id}`}>
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">
        Modificar Avance en {queryData.filtrarAvance._id}
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl"
      >
        <Input
          name="fecha"
          label="Fecha de actualización"
          required={true}
          type="date"
          defaultValue={queryData.filtrarAvance.fecha}
        />
        <Input
          name="descripcion"
          label="Descripción del avance"
          required={true}
          type="text"
          defaultValue={queryData.filtrarAvance.descripcion}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default ActualizarAvance;
