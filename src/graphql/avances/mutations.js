/* import {gql} from '@apollo/client';

const NUEVO_AVANCE = gql`
    mutation crearAvance(
        $proyecto: String!
		$fecha: Date
		$descripcion: String!
		$creadoPor: String!
    ){
        crearAvance(
            proyecto: $proyecto,
			fecha: $fecha,
			descripcion: $descripcion,
			creadoPor: $creadoPor
        ){
            proyecto
			fecha
			descripcion
			creadoPor{
                _id
                nombre
                apellido
            }
        }
    }
`;

const ACTUALIZAR_AVANCE = gql`
    mutation actualizarAvance(
        $_id: ID!
		$descripcion: String!
		$observaciones: String!
    ){
        actualizarAvance(
        _id
        descripcion    
        ){
            _id
            descripcion
        }
        crearObservacion(
            _id
            observaciones
        ){
            _id
            observaciones
        }
    }
`;

export { NUEVO_AVANCE, ACTUALIZAR_AVANCE}; */