import React, { useState } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import DropDown from 'components/DropDown';
import { Enum_Rol } from 'utils/enum';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();
  const [mensaje, guardarMensaje] = useState(null);
  const [register] = useMutation(REGISTRO);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      register({ variables: formData });

      Swal.fire(
        'Creado',
        'Usuario creado, debes esperar hasta que tu cuenta sea activada por un administrador o Líder',
        'success'
      );
      navigate('/auth/login');
    } catch (error) {
      guardarMensaje(error.message.replace('GraphQL error: ', ''));

      setTimeout(() => {
        guardarMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className='bg-white py-5 px-3 w-full my-3 max-w-sm text-center mx-auto text-indigo-500 font-bold text-xl'>
        <p>{mensaje}</p>
      </div>
    );
  };

  // useEffect(() => {
  //     if (dataMutation) {
  //       if (dataMutation.register.token) {
  //         setToken(dataMutation.registro.token);
  //         navigate('/');
  //       }
  //     }
  //   }, [dataMutation],setToken,navigate);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      {mensaje && mostrarMensaje()}
      <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
      <form
        className='flex flex-col p-10 bg-gray-100 text-xl text-gray-500 uppercase font-bold rounded-3xl'
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre:' name='nombre' type='text' required />
          <Input label='Apellido:' name='apellido' type='text' required />
          <Input
            label='Documento:'
            name='identificacion'
            type='text'
            required
          />
          <DropDown
            label='Rol deseado:'
            name='rol'
            required
            options={Enum_Rol}
          />
          <Input label='Correo:' name='correo' type='email' required />
          <Input label='Contraseña:' name='password' type='password' required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={false}
          text='Registrarme'
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to='/auth/login'>
        <span className='text-blue-700'>Inicia sesión</span>
      </Link>
    </div>
  );
};

export default Register;
