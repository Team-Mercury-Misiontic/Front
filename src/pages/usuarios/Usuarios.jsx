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
import Swal from 'sweetalert2';

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

<<<<<<< HEAD
  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO,
    {
    update(cache)
    {
      const {Usuarios}= cache.readQuery({GET_USUARIOS});
=======
  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const [eliminarUsuario, { data: mutationData, loading: loadingMutation, error: mutationError }] =
      useMutation(ELIMINAR_USUARIO);
>>>>>>> development

      cache.writeQuery({
        query:GET_USUARIOS,
        data:{
          obtenerUsuarios:Usuarios.filter(usuarioActual=>usuarioActual.id!==_id)
        }
      })

<<<<<<< HEAD
=======
  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario eliminado correctamente");
      refetch();
    }
  }, [mutationData, loadingMutation]);
>>>>>>> development

    }
  });

  //eliminar usuario
  const confirmarEliminarUser =_id=>{
    Swal.fire({
      title: '¿Deseas eliminar a este usuario?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then( async (result) => {
      if (result.value) {

          try {
              
              //console.log("Eliminado",id)
              const { data } = await eliminarUsuario({
                  variables: {
                      _id
                  }
              });
              // console.log(data);

              // Mostrar una alerta
              Swal.fire(
                  'Eliminado!',
                  data.eliminarUsuario,
                  'success'
              )
          } catch (error) {
              console.log(error);
          }
      }
    })
  }

  // const eliminarUsuario1= _id => {
  //   eliminarUsuario(_id)
  //   setOpenDialog(false)
  // }
  // const [eliminarUsuario, { data: mutationData, error: mutationError }] =
  //     useMutation(ELIMINAR_USUARIO,{
  //       variables: { _id },
  //     });


  // useEffect(() => {
  //   if (mutationData) {
  //     toast.success("Usuario eliminado correctamente");
  //   }
  // }, [mutationData]);

  // useEffect(() => {
  //   if (mutationError) {
  //     toast.error("Error eliminando el usuario");
  //   }
  // }, [mutationError]);

  if (loading || loadingMutation)
    return (
      <ReactLoading className="mx-96" type="spin" color="#4c2882" height={667} width={365} />
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
                      </button>
                    </Link>
                    <button
                      className="col-span-2 bg-red-400 p-2 rounded-full shadow-md hover:bg-red-600 text-white"
<<<<<<< HEAD
                     // onClick={() => setOpenDialog(true)}
                      onClick={() => confirmarEliminarUser(item._id)}
                    >
                      Eliminar
                    </button>
                    
                    {/* <Dialog open={openDialog}>
                      <div className="p-8 flex flex-col">
                        <h1 className="text-gray-900 text-2xl font-bold">
                          ¿Está seguro de querer eliminar el usuario?
                        </h1>
                        <div className="flex w-full items-center justify-center my-4">
                          <button
                            onClick={() => eliminarUsuario1(item._id)}
                           
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
                    </Dialog> */}
=======
                      onClick={() => handleDeleteUser(item)}
                    >
                      Eliminar
                    </button>
>>>>>>> development
                  </td>
                </tr>
              );
            })}
          {/* ) : (<div>No autorizado</div> */}
        </tbody>
      </table>

<<<<<<< HEAD
=======
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
>>>>>>> development
    </Fragment>
    //</PrivateRoute>
  );
};

export default Usuarios;