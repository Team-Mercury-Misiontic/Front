import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CrearRegistro($proyecto: String!, $estudiante: String!) {
    crearRegistro(proyecto: $proyecto, estudiante: $estudiante) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
    aprobarInscripcion(id: $aprobarInscripcionId) {
      _id
    }
  }
`;

const FECHA_FINAL = gql`
  mutation FinalizarInscripcion($finalizarInscripcionId: String!) {
    finalizarInscripcion(id: $finalizarInscripcionId) {
      _id
    }
  }
`;

const RECHAZAR_INSCRIPCION = gql`
  mutation RechazarInscripcion($rechazarInscripcionId: String!) {
    rechazarInscripcion(id: $rechazarInscripcionId) {
      _id
    }
  }
`;

export {
  CREAR_INSCRIPCION,
  APROBAR_INSCRIPCION,
  RECHAZAR_INSCRIPCION,
  FECHA_FINAL,
};
