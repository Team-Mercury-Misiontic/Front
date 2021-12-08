import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_AVANCE_BY_PROJECT } from "graphql/avances/queries";
//import PrivateRoute from "components/PrivateRoute";
import ReactLoading from "react-loading";
import { Dialog } from "@material-ui/core";
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';
import { useParams } from "react-router";
import { ACTUALIZAR_AVANCE } from "graphql/avances/mutations";


const VerAvance = () => {
  const { _id } = useParams();
  const { data, error, loading, refetch } = useQuery(GET_AVANCE_BY_PROJECT, {
    variables: { _id },
  });

  const [actualizarAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ACTUALIZAR_AVANCE);


    useEffect(() => {
      if (mutationData) {      
        refetch();
      }
    }, [mutationData]);
  
    useEffect(() => {
      if (mutationError) {
        console.error(`error realizando creacion ${mutationError}`);
        toast.error("Error  realizando creacion");
      }
    }, [mutationError]);
  

  //useEffect para datos traido del back
  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(`error obteniendo los usuarios ${error}`)
      toast.error("Error consultando los usuarios");
    }
  }, [error]);
 
  if (loading || mutationLoading)
    return (
      <ReactLoading type="cylon" color="#4c2882" height={667} width={365} />
    );

    const addObservacion = (avanceId)  => {
      const observacion = document.getElementsByName("obs"+avanceId)[0].value;  
      
      if (observacion) {
        
        console.log("añadiendo "+observacion);
        
        actualizarAvance({
          variables: {
            _id: avanceId,
            observaciones: observacion
          },
        });
      }      

    }

  return (
    //<PrivateRoute roleList={["ADMINISTRADOR"]}>
    <Fragment>
      <h1 className="text-3xl font-extrabold text-gray-900 my-3 text-center">
        Avances del proyecto {data.filtrarAvance[0].proyecto.nombre}
      </h1>
      <br />
    
    <div className="p-3">
      <table className="tabla">
        <thead>
          <tr>            
            <th scope="col">Fecha</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Creado Por</th>
            <th scope="col">Observaciones</th>            
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.filtrarAvance.map((item) => {
              return (              
                <tr key={item._id}>
                  <td>{item.fecha.split("T")[0]}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.creadoPor.nombre}</td>
                  <td><ul>{item.observaciones.map((obs) => {
                    return (<li key={obs}>{obs}</li>)
                  })}</ul></td>                 
                  <td>
                    <input className="rounded-md	mb-2	border-2	border-blue-300	" type="text" name={`obs${item._id}`} /> <br/>
                    <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white" onClick={() => addObservacion(item._id)}>
                      Agregar Observacion</button>
                  </td>
                </tr>            
              );
            })}
        </tbody>
      </table>
      </div>
   
    </Fragment>
    //</PrivateRoute>
  );
};

export default VerAvance;