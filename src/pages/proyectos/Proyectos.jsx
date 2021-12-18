import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Objetivos from 'components/Objetivos';
import ReactLoading from 'react-loading';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';
import { GET_PROYECTOS } from '../../graphql/proyectos/queries';

const Proyectos = () => {
  const { data, error, loading, refetch } = useQuery(GET_PROYECTOS);
  const { userData } = useUser();
  useEffect(() => {
    if (error) {
      console.error(`error obteniendo los Proyectos ${error}`);
      toast.error('Error consultando los Proyectos');
      return `Error obteniendo los Proyectos ${error}`;
    }
  }, [error]);
  if (loading)
    return (
      <ReactLoading type='cylon' color='#4c2882' height={667} width={365} />
    );
  if (data) {
    refetch();
    return (
      <>
        <PrivateComponent roleList='ADMINISTRADOR'>
          <div className='w-full'>
            <div className='my-6 font-sans text-4xl text-center font-bold'>
              <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>
                PROYECTOS
              </h1>
            </div>
            <Administrador data={data.Proyectos} Usuario={userData} />
          </div>
        </PrivateComponent>

        <PrivateComponent roleList='LIDER'>
          <div className='w-full'>
            <div className='my-6 font-sans text-4xl text-center font-bold'>
              <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>
                PROYECTOS LIDERADOS
              </h1>
            </div>
            <Lider data={data.Proyectos} Usuario={userData} />
          </div>
        </PrivateComponent>

        <PrivateComponent roleList='ESTUDIANTE'>
          <div className='w-full'>
            <div className='my-6 font-sans text-4xl text-center font-bold'>
              <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>
                PROYECTOS
              </h1>
            </div>
            <Estudiante data={data.Proyectos} Usuario={userData} />
          </div>
        </PrivateComponent>
      </>
    );
  }
  return 'REVISAR BACKEND O BASE DE DATOS';
};

const Administrador = ({ data, Usuario }) => {
  const [busqueda, setBusqueda] = useState('');
  const bChange = (e) => {
    setBusqueda(e.target.value);
  };
  const datos = data
    .filter((proyecto) => {
      if (
        proyecto._id
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider._id.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.apellido
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        proyecto.fase.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.estado.toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return proyecto;
      }
      return null;
    })
    .map((item) => {
      return (
        <>
          <tr>
            <td key={item._id} className='text-center'>
              {' '}
              {item._id}
            </td>
            <td> {item.nombre}</td>
            <td>
              {' '}
              {item.lider.nombre} {item.lider.apellido}
            </td>
            <td> {item.fase}</td>
            <td>
              {' '}
              <Objetivos item={item} tipo='GENERAL' className='list-none' />
            </td>
            <td>
              <Link
                to={`/Proyectos/${item._id}`}
                className='block bg-blue-400 hover:bg-blue-600 rounded-full px-2 text-white h-6 mb-1'
              >
                Ver mas
              </Link>
              {item.fase === 'TERMINADO' ? null : (
                <Link
                  to={`/Proyectos/EditarProyecto/${item._id}`}
                  className='block bg-green-400 hover:bg-green-600 rounded-full px-2 text-white h-6'
                >
                  Gestionar
                </Link>
              )}
            </td>
          </tr>
        </>
      );
    });
  return (
    <>
      <div className='pl-4 mb-5'>
        <label className='font-bold'>BUSCAR: </label>
        <input
          className='appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          value={busqueda}
          placeholder='Búsqueda por cualquier campo'
          onChange={bChange}
        />
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre del Proyecto</th>
            <th scope='col'>Lider</th>
            <th scope='col'>Fase</th>
            <th scope='col'>Objetivos</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>{datos}</tbody>
      </table>
    </>
  );
};

const Lider = ({ data, Usuario }) => {
  const [busqueda, setBusqueda] = useState('');
  const [activo, isActivo] = useState(false);
  const bChange = (e) => {
    setBusqueda(e.target.value);
  };
  const datos = data
    .filter((proyecto) => {
      if (
        proyecto._id
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return proyecto;
      }
    })
    .map((item) => {
      const Gestionar = (item) => {
        if (item.item.estado === 'ACTIVO') {
          return (
            <>
              <Link
                to={`/Proyectos/EditarProyecto/${item.item._id}`}
                className='block px-2 bg-green-400 hover:bg-green-600 rounded-full text-white h-6'
              >
                Gestionar
              </Link>
            </>
          );
        }
        return null;
      };
      if (item.lider._id === Usuario._id) {
        if (activo === true && item.estado === 'ACTIVO') {
          return (
            <>
              <tr>
                <td key={item.id} className='text-center'>
                  {' '}
                  {item._id}
                </td>
                <td> {item.nombre}</td>
                <td>
                  {' '}
                  {item.lider.nombre} {item.lider.apellido}
                </td>
                <td> {item.fase}</td>
                <td>
                  {' '}
                  <Objetivos item={item} tipo='GENERAL' className='list-none' />
                </td>
                <td>
                  <Link
                    to={`/Proyectos/${item._id}`}
                    className='block bg-blue-400 px-2 hover:bg-blue-600 rounded-full text-white h-6 mb-1'
                  >
                    Ver mas
                  </Link>
                  <Gestionar item={item} />
                </td>
              </tr>
            </>
          );
        }
        if (activo === false) {
          return (
            <>
              <tr>
                <td key={item.id} className='text-center'>
                  {' '}
                  {item._id}
                </td>
                <td> {item.nombre}</td>
                <td>
                  {' '}
                  {item.lider.nombre} {item.lider.apellido}
                </td>
                <td> {item.fase}</td>
                <td>
                  {' '}
                  <Objetivos item={item} tipo='GENERAL' className='list-none' />
                </td>
                <td>
                  <Link
                    to={`/Proyectos/${item._id}`}
                    className='block bg-blue-400 px-2 hover:bg-blue-600 rounded-full text-white h-6 mb-1'
                  >
                    Ver mas
                  </Link>
                  <Gestionar item={item} />
                </td>
              </tr>
            </>
          );
        }
        return null;
      }
    });
  return (
    <>
      <div className='pl-4 mb-5'>
        <label className='font-bold'>BUSCAR: </label>
        <input
          className='appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          value={busqueda}
          placeholder='Búsqueda por Identificación o Nombre'
          onChange={bChange}
        />
        <Link
          to='/Proyectos/NuevoProyecto'
          className='bg-indigo-700 text-white font-bold text-lg py-3 px-6 relative top-3 left-1/4 rounded-xl hover:bg-indigo-500 shadow-md'
        >
          Crear Proyecto
        </Link>
        <div>
          <input
            type='checkbox'
            className='mx-2'
            id='active'
            onClick={(e) => isActivo(!activo)}
          />
          <label htmlFor='active' className='text-base'>
            Solo proyectos activos
          </label>
        </div>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre del Proyecto</th>
            <th scope='col'>Lider</th>
            <th scope='col'>Fase</th>
            <th scope='col'>Objetivos</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>{datos}</tbody>
      </table>
    </>
  );
};

const Estudiante = ({ data, Usuario }) => {
  const [busqueda, setBusqueda] = useState('');
  const [registrado, isRegistrado] = useState(false);
  console.log('Usuario', Usuario);
  const bChange = (e) => {
    setBusqueda(e.target.value);
  };
  const datos = data
    .filter((proyecto) => {
      if (
        proyecto._id
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.lider.apellido.toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return proyecto;
      }
    })
    .map((item) => {
      const filtro = item.registros.filter(
        (registro) =>
          registro.estudiante._id === Usuario._id &&
          registro.estado === 'ACEPTADA'
      );
      console.log(item.registros);
      if (registrado && item.estado === 'ACTIVO') {
        if (filtro.length !== 0) {
          return (
            <>
              <tr>
                <td>{item._id}</td>
                <td>{item.nombre}</td>
                <td>
                  {item.lider.nombre} {item.lider.apellido}
                </td>
                <td>{item.fase}</td>
                <td>
                  <Objetivos item={item} tipo='GENERAL' className='list-none' />
                </td>
                <td>
                  <Link
                    to={`/Proyectos/${item._id}`}
                    className='block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1'
                  >
                    Ver mas
                  </Link>
                </td>
              </tr>
            </>
          );
        }
        return null;
      }
      if (item.estado === 'ACTIVO') {
        return (
          <>
            <tr>
              <td>{item._id}</td>
              <td>{item.nombre}</td>
              <td>
                {item.lider.nombre} {item.lider.apellido}
              </td>
              <td>{item.fase}</td>
              <td>
                <Objetivos item={item} tipo='GENERAL' className='list-none' />
              </td>
              <td>
                <Link
                  to={`/Proyectos/${item._id}`}
                  className='block px-2 bg-blue-400 hover:bg-blue-600 rounded-full text-white h-6 mb-1'
                >
                  Ver mas
                </Link>
              </td>
            </tr>
          </>
        );
      }
    });
  return (
    <>
      <div className='pl-4 mb-5'>
        <label className='font-bold'>BUSCAR: </label>
        <input
          className='appearance-none rounded-none w-72 px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          value={busqueda}
          placeholder='Búsqueda por Identificación o Nombre'
          onChange={bChange}
        />
        <div>
          <input
            type='checkbox'
            className='mx-2'
            id='active'
            onClick={(e) => isRegistrado(!registrado)}
          />
          <label htmlFor='active' className='text-base'>
            Proyectos en curso{' '}
          </label>
        </div>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre del Proyecto</th>
            <th scope='col'>Lider</th>
            <th scope='col'>Fase</th>
            <th scope='col'>Objetivos</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>{datos}</tbody>
      </table>
    </>
  );
};

export default Proyectos;
