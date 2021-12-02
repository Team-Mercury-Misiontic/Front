import { gql } from '@apollo/client';

const CREAR_USUARIO = gql`
mutation CrearUsuario(
  $nombre: String!
  $apellido: String!
  $identificacion: String!
  $correo: String!
  $rol: Enum_Rol!
  $estado: Enum_EstadoUsuario!
  $password: String!
){
  crearUsuario(
    nombre: $nombre
    apellido: $apellido
    identificacion: $identificacion
    correo: $correo
    rol: $rol
    estado: $estado
    password: $password
  ) {
    nombre
    apellido
    correo
    estado
    identificacion
    rol
  }
}
`;


const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario(
    $_id: String
    $correo: String
  ) {
    eliminarUsuario(
      _id: $_id
      correo: $correo
    ){
      _id
      correo      
    }
  }
`;

export { EDITAR_USUARIO, ELIMINAR_USUARIO, CREAR_USUARIO };