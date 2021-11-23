import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import Index from "pages/Index";
import Proyectos from "pages/Proyectos";
import Usuarios from "pages/usuarios/Usuarios";
import EditarUsuario from "pages/usuarios/EditarUsuario";
import Perfil from "pages/Perfil";
import Inscripciones from "pages/Inscripciones";
import "styles/globals.css";
import "styles/tabla.css";


// import PrivateRoute from 'components/PrivateRoute';

//Reemplazar link de despliegue back
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache()
});

function App() {
  const [userData, setUserData] = useState({});

  return (
    <ApolloProvider client={client}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="Proyectos" element={<Proyectos />} />
                <Route path="Usuarios" element={<Usuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path="Inscripciones" element={<Inscripciones />} />
                <Route path="Perfil" element={<Perfil />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
