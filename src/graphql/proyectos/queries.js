import { gql } from '@apollo/client';


export const GET_PROYECTOS = gql`
 query Proyectos {
    Proyectos {
    _id
		nombre
		presupuesto
		fechaInicio
		fechaFin
		estado
		fase
		lider{
        _id
        nombre
        apellido
      }
      objetivos{
        descripcion
        tipo
      }
      registros{
        estudiante{
          _id
          nombre
          apellido
        }
      }
    }
  }
`;

export const GET_PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto (_id: $_id) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider{
          _id 
          nombre
          apellido
        }
      objetivos{
        descripcion
        tipo
      }
      avances{
        descripcion
        fecha
        observaciones      
      }
      registros{
        estado
        estudiante{
          _id
          }
        }
      }
    }
`;