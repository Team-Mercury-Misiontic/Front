import { gql } from '@apollo/client';

const REGISTRO = gql`
	mutation Register(
		$nombre: String!
		$apellido: String!
		$identificacion: String!
		$correo: String!
		$rol: Enum_Rol!
		$password: String!
	) {
		register(
			nombre: $nombre
			apellido: $apellido
			identificacion: $identificacion
			correo: $correo
			rol: $rol
			password: $password
		) {
			token
			error
		}
	}
`;

export { REGISTRO };
