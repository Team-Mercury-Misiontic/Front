import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import Index from 'pages/Index';
import Proyectos from 'pages/proyectos/Proyectos';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import EditarProyecto from 'pages/proyectos/EditarProyecto';
import VerProyecto from 'pages/proyectos/VerProyecto';
import Usuarios from 'pages/usuarios/Usuarios';
import NuevoUsuario from 'pages/auth/NuevoUsuario';
import EditarUsuario from 'pages/usuarios/EditarUsuario';
import Perfil from 'pages/Perfil';
import Inscripciones from 'pages/Inscripciones';
import 'styles/globals.css';
import 'styles/tabla.css';
import { setContext } from '@apollo/client/link/context';
import { Login } from 'pages/auth/login';
import { AuthContext } from 'context/AuthContext';

// import PrivateRoute from 'components/PrivateRoute';

//Reemplazar link de despliegue back
const httpLink = createHttpLink({
	uri: 'https://backen-mercury.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = JSON.parse(localStorage.getItem('token'));
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : 'it',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	const [userData, setUserData] = useState({});
	const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
		setAuthToken(token);
		if (token) {
			localStorage.setItem('token', JSON.stringify(token));
		} else {
			localStorage.removeItem('token')
		}
	};

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
				<UserContext.Provider value={{ userData, setUserData }}>
					<BrowserRouter>
						<Routes>
							<Route path="/Registro" element={<NuevoUsuario />} />
							<Route path="/Login" element={<Login />} />
							<Route path="/" element={<PrivateLayout />}>
								<Route path="" element={<Index />} />
								<Route path="Proyectos" element={<Proyectos />} />
								<Route path="Proyectos/:_id" element={<VerProyecto />} />
								<Route
									path="Proyectos/NuevoProyecto"
									element={<NuevoProyecto />}
								/>
								<Route
									path="Proyectos/EditarProyecto/:_id"
									element={<EditarProyecto />}
								/>
								<Route path="Usuarios" element={<Usuarios />} />
								<Route
									path="/usuarios/EditarUsuario/:_id"
									element={<EditarUsuario />}
								/>
								<Route path="Inscripciones" element={<Inscripciones />} />
								<Route path="Perfil" element={<Perfil />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</UserContext.Provider>
			</AuthContext.Provider>
		</ApolloProvider>
	);
}

export default App;
