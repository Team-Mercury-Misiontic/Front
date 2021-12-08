import { gql } from "@apollo/client";

const CREAR_AVANCE = gql`
  mutation Mutation(
    $proyecto: String!
    $fecha: Date
    $descripcion: String!
    $creadoPor: String!
  ) {
    crearAvance(
      proyecto: $proyecto
      fecha: $fecha
      descripcion: $descripcion
      creadoPor: $creadoPor
    ) {
      proyecto
      fecha
      descripcion
      creadoPor {
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
  ) {
    editarAvance(_id: $_id, descripcion: $descripcion) {
      _id
      descripcion
    }
    createAvance(_id: $_id, observaciones: $observaciones) {
      _id
      observaciones
    }
  }
`;

export { CREAR_AVANCE, ACTUALIZAR_AVANCE };
