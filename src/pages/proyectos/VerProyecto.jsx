import React, { useEffect, useState } from "react";
import { GET_PROYECTO } from "../../graphql/proyectos/queries";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Objetivos from "components/Objetivos";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useUser } from "context/userContext";
import PrivateComponent from "components/PrivateComponent";

const VerProyecto = () => {
  const { _id } = useParams();
  const { userData } = useUser();

  const { data, error, loading } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      toast.error("Error al mostrar los proyectos");
    }
  }, [error]);

  if (loading)
    return (
      <ReactLoading type="cylon" color="#4c2882" height={667} width={365} />
    );
  return (
    <div className="w-full">
      <header className="items-center justify-center p-3">
        <Link to="/Proyectos">
          <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
        </Link>
        <h1 className="mx-2 text-3xl text-gray-800 font-bold text-center">
          {data.Proyecto.nombre}
        </h1>
      </header>
      <div className="mx-4 grid grid-cols-2 gap-4 mb-6 ">
        <section className="bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-2">
          <h2 className="text-center font-bold text-2xl col-span-4 mb-2">
            {" "}
            INFORMACION DEL PROYECTO
          </h2>
          <div className="pl-3 grid grid-cols-4">
            <div className="col-start-1 font-bold">ID del proyecto:</div>{" "}
            <div className="col-start-2 col-span-3">{data.Proyecto._id}</div>
            <div className="col-start-1 font-bold">Lider:</div>{" "}
            <div className="col-start-2 col-span-3 uppercase">
              {data.Proyecto.lider.nombre} {data.Proyecto.lider.apellido}
            </div>
            <span className="col-start-1 font-bold">Presupuesto:</span>{" "}
            <span className="col-start-2 uppercase">
              {data.Proyecto.presupuesto}
            </span>
            <span className="col-start-1 font-bold">Fecha de Inicio:</span>{" "}
            <span className="col-start-2 uppercase">
              {data.Proyecto.fechaInicio === null
                ? "EL PROYECTO AUN NO HA EMPEZADO"
                : data.Proyecto.fechaInicio}
            </span>
            <span className="col-start-1 font-bold">
              Fecha de Finalizacion:
            </span>{" "}
            <span className="col-start-2 uppercase">
              {data.Proyecto.fechaFin === null
                ? "EL PROYECTO AUN NO TERMINADO"
                : data.Proyecto.fechaFin}
            </span>
            <span className="col-start-1 font-bold">Fase:</span>{" "}
            <span className="col-start-2 uppercase">{data.Proyecto.fase}</span>
            <span className="col-start-1 font-bold">Estado:</span>{" "}
            <span className="col-start-2 uppercase">
              {data.Proyecto.estado}
            </span>
          </div>
        </section>
        <section className="bg-blue-50 border-blue-500 border-solid border-2 col-span-2 py-4">
          <h2 className="text-center font-bold text-xl"> OBJETIVOS</h2>
          <h3 className="pl-3 font-bold">OBJETIVOS GENERALES</h3>
          <ul className="pl-10">
            <Objetivos
              item={data.Proyecto}
              tipo="GENERAL"
              className="list-disc"
            />
          </ul>
          <h3 className="pl-3 font-bold">OBJETIVOS ESPECIFICOS</h3>
          <ul className="pl-10">
            <Objetivos
              item={data.Proyecto}
              tipo="ESPECIFICO"
              className="list-disc"
            />
          </ul>
        </section>
        <section className="bg-blue-50 border-blue-500 border-solid border-2 col-start-1 py-4">
          <h2 className="text-center font-bold text-l">
            ESTUDIANTES INSCRITOS
          </h2>
          <Estudiantes item={data} />
          {userData.rol === "ESTUDIANTE" ? (
            <InscripcionProyecto
              idProyecto={data.Proyecto._id}
              estado={data.Proyecto.estado}
              inscripciones={data}
            />
          ) : null}
        </section>
        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
          <section className="bg-blue-50 border-blue-500 border-solid border-2 col-start-2 py-4 text-center">
            <h2 className="text-center font-bold text-l">AVANCES</h2>
            <Avances item={data.Proyecto} />
          </section>
        </PrivateComponent>
      </div>
    </div>
  );
};

const Estudiantes = ({ item }) => {
  // const estado= item.registros[0].estado;
  //console.log('Datos de los estudiantes',item.Proyecto.registros)
  const Estudiantes = item.Proyecto.registros.map((estudiante) => {
    if (estudiante.estado === "ACEPTADA") {
      return (
        <ul className="pl-2">
          <li className="list-disc list-inside">
            {estudiante.estudiante.nombre} {estudiante.estudiante.apellido}
          </li>
        </ul>
      );
    } else return null;
  });

  const filtro = Estudiantes.filter((estudiante) => estudiante !== null);
  if (filtro.length !== 0) {
    return Estudiantes;
  } else {
    return (
      <p className="text-center">NO HAY ESTUDIANTES REGISTRADOS AL PROYECTO </p>
    );
  }
};

const Avances = ({ item }) => {
  const Avances = item.avances;
  if(item.registros.length !== 0){
    if(item.registros[0].estado==='ACEPTADA'){
      if (item.fase === 'INICIADO' || item.fase === "DESARROLLO") {
        if (Avances.length !== 0) {
          return (
            <>
              <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
                <Link to={`/VerAvance/${item._id}`}>
                  <p className="text-center">
                    Hay {Avances.length}{" "}
                    {Avances.length === 1 ? " avance" : " avances"} en el proyecto{" "}
                  </p>
                  <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white">
                    Ver Avances
                  </button>
                </Link>
              </PrivateComponent>
              <br />
              <PrivateComponent roleList={["ESTUDIANTE"]}>
                <Link to={`/Avances/${item._id}`}>   
                  <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white  m-3">
                    Añadir Avance
                  </button>
                </Link>
              </PrivateComponent>
            </>
          );
        } else
          return (
            <>
              {" "}
              <p className="text-center">No hay avances en el proyecto </p>
              <PrivateComponent roleList={["ESTUDIANTE"]}>
                <Link to={`/Avances/${item._id}`}>
                  <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white">
                    Añadir Avance
                  </button>
                </Link>
              </PrivateComponent>
            </>
          );
      }else{
        return (
          <>
            {" "}
            <p className="text-center">No se pueden registrar avances en un proyecto Terminado o Inactivo </p>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white">
                Añadir Avance
              </button>
            </PrivateComponent>
          </>
        );
      }    
    }else{
      return (
        <>
          {" "}
          <p className="text-center">
            No puedes registrar avances, si no está iniciado o en desarrollo{" "}
          </p>
        </>
      );
    } 
  }else{
    return (
      <>
        {" "}
        <p className="text-center">
          No puedes registrar avances, si no estas inscrito en el proyecto.{" "}
        </p>
        <PrivateComponent roleList={["ESTUDIANTE"]}>
          <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white">
            Añadir Avance
          </button>
        </PrivateComponent>
      </>
    );
  }
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearRegistro, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.Proyecto.registros.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log("datos de la inscripcion", data);
      toast.success("Registro Exitoso");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearRegistro({
      variables: {
        proyecto: idProyecto,
        estudiante: userData._id,
      },
    });
    //crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
  };

  return (
    <>
      {estadoInscripcion !== "" ? (
        <span>El estado de su solicitud es: {estadoInscripcion}</span>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      )}
    </>
  );
};

export default VerProyecto;
