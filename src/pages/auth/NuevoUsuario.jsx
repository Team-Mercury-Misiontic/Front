import React, { useEffect } from 'react';
import { from, useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREAR_USUARIO } from '../../graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_Rol } from 'utils/enum';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { REGISTRO } from 'graphql/auth/mutation';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/AuthContext';

const NuevoUsuario = () => {
	const navigate = useNavigate();
	const { setToken } = useAuth();
	const { form, formData, updateFormData } = useFormData();
	const [
		registro,
		{ data: mutationData, loading: mutationLoading, error: mutationError },
	] = useMutation(REGISTRO);

	const submitForm = (event) => {
		event.preventDefault();
		registro({
			variables: formData,
		});
	};

	useEffect(() => {
		console.log(mutationData);
		if (mutationData) {
			if (mutationData.register.token) {
				setToken(mutationData.register.token);
				navigate('/');
			}
		}
	}, [mutationData]);

	return (
		<>
			<section className="pt-11 text-center h-32 ">
				<h1 className="font-sans text-4xl font-bold">REGISTRATE</h1>
			</section>
			<section className="h-3/4 ">
				<form
					className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold h-full rounded-3xl"
					onSubmit={submitForm}
					onChange={updateFormData}
					ref={form}
				>
					<label htmlFor="nombre">Nombre</label>
					<input
						placeholder="Nombre"
						name="nombre"
						type="text"
						id="nombre"
						required
						className="m-auto text-center rounded-md text-black text-lg"
					/>
					<label htmlFor="apellido">Apellido</label>
					<input
						id="apellido"
						name="apellido"
						type="text"
						required
						placeholder="Apellido"
						className="m-auto text-center rounded-md text-black text-lg"
					/>
					<label htmlFor="identificacion">Identificacion</label>
					<input
						placeholder="Identificacion"
						name="identificacion"
						type="text"
						required
						type="text"
						id="identificacion"
						className="m-auto text-center rounded-md text-black text-lg"
					/>
					<label htmlFor="inicio">Correo electronico</label>
					<input
						type="email"
						name="correo"
						type="email"
						required
						placeholder="Correo Electronico"
						id="inicio"
						className="m-auto text-center rounded-md text-black text-lg"
					/>
					<label htmlFor="rol">Rol</label>
					<DropDown
						label="Rol deseado:"
						name="rol"
						required={true}
						options={Enum_Rol}
					/>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						name="password"
						type="password"
						required
						id="password"
						placeholder="Contraseña"
						className="m-auto text-center rounded-md text-black text-lg mb-3"
					/>
					{/* <label htmlFor="estado">Estado</label>
					<select
						ref={(estado) => setUsuario((usuario.estado = estado))}
						id="estado"
						className="m-auto text-center rounded-md text-black text-lg mb-3"
					>
						<option disabled selected>
							ELIJA SU ESTADO
						</option>
						<option value="PENDIENTE">Pendiente</option>
						<option disabled value="AUTORIZADO">
							Autorizado
						</option>
						<option disabled value="NO_AUTORIZADO">
							No Autorizado
						</option>
					</select> */}
					<ButtonLoading
						disabled={Object.keys(formData).length === 0}
						loading={false}
						text="Registrarme"
					/>
				</form>
			</section>
		</>
	);
};

export default NuevoUsuario;
