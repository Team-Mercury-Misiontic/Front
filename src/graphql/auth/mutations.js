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

const CAMBIAR_CLAVE = gql`
  mutation CambiarClave($correo: String, $password: String, $clave: String) {
    cambiarClave(correo: $correo, password: $password, clave: $clave)
  }
`;

const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN, CAMBIAR_CLAVE };
