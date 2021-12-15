import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import Index from "pages/Index";
import Proyectos from "pages/proyectos/Proyectos";
import NuevoProyecto from "pages/proyectos/NuevoProyecto";
import EditarProyecto from "pages/proyectos/EditarProyecto"
import VerProyecto from "pages/proyectos/VerProyecto"
import Usuarios from "pages/usuarios/Usuarios";
import NuevoUsuario from "pages/NuevoUsuario"
import EditarUsuario from "pages/usuarios/EditarUsuario";
import Estudiantes from "pages/usuarios/Estudiantes";
import Perfil from "pages/Perfil";
import Inscripciones from "pages/inscripciones/Inscripciones";
import "styles/globals.css";
import "styles/tabla.css";
import Avances from "pages/avances/Avances";
import VerAvance from "pages/avances/VerAvance";
import ActualizarAvance from "pages/avances/ActualizarAvance";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/auth/register";
import Login from "pages/auth/login";
import { AuthContext } from "context/authContext";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';


// import PrivateRoute from 'components/PrivateRoute';

//Reemplazar link de despliegue back
const httpLink = createHttpLink({
  uri: "https://backen-mercury.herokuapp.com/graphql"
  //uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };
  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
        <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
              <Routes>
                <Route path="/Registro" element={<NuevoUsuario/>}/>
                <Route path="/" element={<PrivateLayout />}>
                  <Route path="" element={<Index />} />
                  <Route path="Proyectos" element={<Proyectos />} />
                  <Route path="Proyectos/:_id" element={<VerProyecto />} />   
                  <Route path="Proyectos/NuevoProyecto" element={<NuevoProyecto />} />
                  <Route path="Proyectos/EditarProyecto/:_id" element={<EditarProyecto />} />
                  <Route path="Avances/:_id" element={<Avances />} />
                  <Route path="VerAvance/:_id" element={<VerAvance />} />
                  <Route path="VerAvance/ActualizarAvance/:_id" element={<ActualizarAvance />} />
                  <Route path="Usuarios" element={<Usuarios />} />
                  <Route path='/usuarios/Estudiantes' element={<Estudiantes />} />
                  <Route path='/usuarios/EditarUsuario/:_id' element={<EditarUsuario />} />
                  <Route path='Inscripciones' element={<Inscripciones />} />
                  <Route path='/inscripciones/Inscripciones' element={<Inscripciones />} />
                  <Route path="Perfil" element={<Perfil />} />
                </Route>
                <Route path='/auth' element={<AuthLayout />}>
                  <Route path='register' element={<Register />} />
                  <Route path='login' element={<Login />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
