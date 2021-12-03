import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { ELIMINAR_USUARIO } from "graphql/usuarios/mutations";
//import PrivateRoute from "components/PrivateRoute";
import ReactLoading from "react-loading";
import { Dialog } from "@material-ui/core";
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';

const Usuarios = () => {
  const { data, error, loading, refetch } = useQuery(GET_USUARIOS);

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

  const [busqueda, setBusqueda] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const bChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const [eliminarUsuario, { data: mutationData, loading: loadingMutation, error: mutationError }] =
      useMutation(ELIMINAR_USUARIO);


  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario eliminado correctamente");
    }
  }, [mutationData, loadingMutation]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error eliminando el usuario");
    }
  }, [mutationError]);

  if (loading || loadingMutation)
    return (
      <ReactLoading type="cylon" color="#4c2882" height={667} width={365} />
    );

  return (
    //<PrivateRoute roleList={["ADMINISTRADOR"]}>
    <Fragment>
      <h1 className="text-3xl font-extrabold text-gray-900 my-3 text-center">
        USUARIOS DEL SISTEMA
      </h1>
      <br />
      <div className="rounded-md shadow-sm -space-y-px">
        <label>
          <b>Buscar:</b>
        </label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={busqueda}
          placeholder="Búsqueda por Identificación o Nombre"
          onChange={bChange}
        />
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th scope="col">Identificación</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.filter((user) => {
              if (
                user._id
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase()) ||
                user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                user.identificacion
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              ) {
                return user
              }
            }).map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.identificacion}</td>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.correo}</td>
                  <td>{Enum_Rol[item.rol]}</td>
                  <td>{Enum_EstadoUsuario[item.estado]}</td>
                  <td>
                    <Link to={`/usuarios/EditarUsuario/${item._id}`}>
                      <button className="col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white">
                        Editar
                      </button>{" "}
                    </Link>
                    {"   "}
                    <button
                      className="col-span-2 bg-red-400 p-2 rounded-full shadow-md hover:bg-red-600 text-white"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* ) : (<div>No autorizado</div> */}
        </tbody>
      </table>

      <Dialog open={openDialog}>
        <div className="p-8 flex flex-col">
          <h1 className="text-gray-900 text-2xl font-bold">
            ¿Está seguro de querer eliminar el usuario?
          </h1>
          <div className="flex w-full items-center justify-center my-4">
            <button
                onClick={() => eliminarUsuario({
                  variables : {_id: currentUser._id, correo: currentUser.correo}
                })
                    .then(refetch())
                    .then(r => setOpenDialog(false))
                }
                className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
            >
              Sí
            </button>
            <button
                onClick={() => setOpenDialog(false)}
                className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
            >
              No
            </button>
          </div>
        </div>
      </Dialog>
    </Fragment>
    //</PrivateRoute>
  );
};

export default Usuarios;
