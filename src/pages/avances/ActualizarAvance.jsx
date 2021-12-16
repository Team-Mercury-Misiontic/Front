import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { EDITAR_AVANCE } from "graphql/avances/mutations";
import { GET_AVANCE_ID } from "graphql/avances/queries";

const ActualizarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  let moment = require('moment');
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCE_ID, { variables: { id:_id } });


  // console.log('Datos de la query',queryData);
  // console.log('Descripcion',queryData.avanceFiltrado[0].descripcion);
  const [
    editarAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("datos fomulario", formData);
    console.log('id a modificar',_id)
    editarAvance({
      variables: {editarAvanceId:_id,...formData },
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
        <Link to={`/VerAvance/${queryData.avanceFiltrado[0].proyecto._id}`}>
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">
        Modificar Avance en {queryData.avanceFiltrado[0].proyecto.nombre}
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
          type="text"
          defaultValue={moment(queryData.avanceFiltrado[0].fecha).format('DD-MM-YYYY')}
        />
        <Input
          name="descripcion"
          label="Descripción del avance"
          required={true}
          type="text"
          defaultValue={queryData.avanceFiltrado[0].descripcion}
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
