import {gql} from '@apollo/client';

export const NUEVO_PROYECTO = gql`
    mutation crearProyecto(
        $nombre: String!
        $presupuesto: Float!
        $fechaInicio: Date!
        $fechaFin: Date!
        $estado: Enum_EstadoProyecto!
        $fase: Enum_FaseProyecto!
        $lider: String!
        $objetivos: [crearObjetivo]		
    ){
        crearProyecto(
			nombre: $nombre,
			presupuesto: $presupuesto,
			fechaInicio: $fechaInicio,
			fechaFin: $fechaFin,
			estado: $estado,
			fase: $fase,
			lider: $lider,
			objetivos: $objetivos
		){
            nombre
            presupuesto
            fechaInicio
            fechaFin
        }
    }
`;
