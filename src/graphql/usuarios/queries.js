import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      correo
      identificacion
      nombre
      apellido
      rol
      estado
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      correo
      identificacion
      nombre
      apellido
      rol
      estado
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
