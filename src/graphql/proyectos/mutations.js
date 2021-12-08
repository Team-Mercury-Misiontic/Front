import {gql} from '@apollo/client';

export const NUEVO_PROYECTO = gql`
    mutation crearProyecto(
        $nombre: String!
        $presupuesto: Float!
        $fechaInicio: Date!
        $fechaFin: Date!
        $lider: String!
        $objetivos: [crearObjetivo]
    ){
        crearProyecto(
			nombre: $nombre,
			presupuesto: $presupuesto,
			fechaInicio: $fechaInicio,
			fechaFin: $fechaFin,
			lider: $lider
            objetivos:$objetivos
		){
            nombre
            presupuesto
            fechaInicio
            fechaFin
            lider{
                _id
            }
            objetivos{
                descripcion
                tipo
            }
        }
    }
`;



export const EDITAR_PROYECTO = gql`
mutation editarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $estado: Enum_EstadoProyecto!
    $fase: Enum_FaseProyecto!
    $lider: String!
    $objetivos: [crearObjetivo]
){
    editarProyecto(
        _id: $_id,
        nombre: $nombre,
        presupuesto: $presupuesto,
        fechaInicio: $fechaInicio,
        fechaFin: $fechaFin,
        estado: $estado,
        fase: $fase,
        lider: $lider
        objetivos: $objetivos
    ){ _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        lider{
            _id
        }
        objetivos{
            descripcion
            tipo
        }
    }
}
`; 
