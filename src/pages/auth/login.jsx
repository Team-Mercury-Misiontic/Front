import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [mensaje, guardarMensaje] = useState(null);
  // const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =useMutation(LOGIN);
  const [login,{loading: mutationLoading}] =
    useMutation(LOGIN);

  const submitForm = async(e) => {
    e.preventDefault();
    try{
      const { data } = await login({
        variables: formData,
      });
        setToken(data.login.token);
        guardarMensaje(null);
        navigate('/');

    }catch(error){
      guardarMensaje(error.message.replace('GraphQL error: ', ''));
      setTimeout(() => {
          guardarMensaje(null);
      }, 5000);
    }
    
  };

  const mostrarMensaje = () => {
    return(
        <div className="bg-white py-5 px-3 w-full my-3 max-w-sm text-center mx-auto text-indigo-500 font-bold text-xl">
            <p>{mensaje}</p>
        </div>
    )
}

// const submitForm = (e) => {
//   e.preventDefault();
//   login({
//     variables: formData,
//   });
// };

//   useEffect(() => {
//     if (dataMutation) {
//       if (dataMutation.login.token) {
//         console.log('antes de setToken',dataMutation)
//         setToken(dataMutation.login.token);
//         navigate('/');
//       }
//     }
//   }, [dataMutation,setToken , navigate]);

//   useEffect(()=>{
//     if(mutationError){
//       toast.error('Ocurrió un error')
//     }
//   },[mutationError]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      {mensaje && mostrarMensaje() }
      <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
      <form className='flex flex-col items-center justify-center min-w-min w-1/3 mx-auto bg-gray-100  py-3 text-center text-xl text-gray-500 uppercase font-bold rounded-3xl' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input name='correo' type='email' label='Correo' required={true} />
        <Input name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Iniciar Sesión'
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'>Regístrate</span>
      </Link>
    </div>
  );
};

export default Login;
