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

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
