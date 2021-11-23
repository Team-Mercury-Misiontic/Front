import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useQuery } from "@apollo/client";
import { GET_USERS } from "graphql/usuarios/queries";
import { Link } from 'react-router-dom';



const Usuarios = () => {
  const {data, error, loading} = useQuery(GET_USERS);

  let users_db = [
    {
      _id: "1",
      email: "john@doe.com",
      id_user: "123456",
      name: "John",
      last_name: "Doe",
      role: "admin",
      status: "active",
    },
    {
      _id: "2",
      email: "jane@doe.com",
      id_user: "7890123",
      name: "Jane",
      last_name: "Doe",
      role: "admin",
      status: "active",
    },
  ];

  //useEffect para datos traido del back
  /* useEffect(() => {
    console.log('data servidor', data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]); */


  const [users, setUsers] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const get_users = () => {
    // Se obtiene los datos de la API
    setUsers(users_db);
  };

  useEffect(() => {
    get_users();
  }, []);

  const bChange = (e) => {
    setBusqueda(e.target.value);
  };

  if (loading) return <div>Cargando....</div>;

  return (
    <Fragment>
      {/* <NavbarComponent /> */}
      <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>USUARIOS DEL SISTEMA</h1>
      <br />

      <div className='rounded-md shadow-sm -space-y-px' >
        <label>
          <b>Buscar:</b>
        </label>
        <input
          className='appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
          {users
            .filter((user) => {
              if (
                user._id
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase()) ||
                user.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                user.id_user.toLowerCase().includes(busqueda.toLowerCase())
              ) {
                return user;
              }
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.id_user}</td>
                  <td>{item.name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/usuarios/EditarUsuario/${item._id}`}>
                      <button className='col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white' >
                        Editar
                      </button>{" "}
                    </Link>
                    {"   "}
                    <button className='col-span-2 bg-red-400 p-2 rounded-full shadow-md hover:bg-red-600 text-white'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
    
  );
};

export default Usuarios;
