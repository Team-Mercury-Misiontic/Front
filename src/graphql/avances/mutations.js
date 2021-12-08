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
      proyecto {
          _id
      }
      fecha
      descripcion
      creadoPor {
        _id
      }
    }
  }
`;

const ACTUALIZAR_AVANCE = gql`
  mutation actualizarAvance(
    $_id: ID!
    $observaciones: String!
  ) {  
    createAvance(_id: $_id, observaciones: $observaciones) {
      _id
      observaciones
    }
  }
`;

export { CREAR_AVANCE, ACTUALIZAR_AVANCE };
