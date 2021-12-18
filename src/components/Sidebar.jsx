import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useUser } from 'context/userContext';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  const { userData } = useUser();
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Home' icon='fas fa-home' />
      <SidebarRoute
        to='/Proyectos'
        title='Gestión Proyectos'
        icon='fas fa-project-diagram'
      />
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <SidebarRoute
          to='/Usuarios'
          title='Gestión Usuarios'
          icon='fas fa-users'
        />
      </PrivateComponent>

      <PrivateComponent roleList={['LIDER']}>
        <SidebarRoute
          to='/usuarios/Estudiantes'
          title='Gestión Usuarios'
          icon='fas fa-users'
        />
      </PrivateComponent>

      <PrivateComponent roleList={['LIDER']}>
        <SidebarRoute
          to='/Inscripciones'
          title='Gestión Inscripciones'
          icon='far fa-edit'
        />
      </PrivateComponent>
      <PrivateComponent roleList={['ESTUDIANTE']}>
        <SidebarRoute
          to='/Perfil'
          title='Editar Perfil'
          icon='fas fa-user-cog'
        />
      </PrivateComponent>
      <Logout />
      <div className=' border-4'>
        <li className='text-center mx-auto text-blue-500 font-bold text-lg'>
          {userData.nombre}
        </li>
        <li className='text-center mx-auto text-blue-500 font-bold text-lg'>
          {userData.rol}
        </li>
      </div>
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-blue-500'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo.png' alt='Logo' className='h-40' />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i
          className={`fas fa-${open ? 'times' : 'bars'}`}
          onClick={() => setOpen(!open)}
        />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
