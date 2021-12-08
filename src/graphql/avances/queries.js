import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances {
        Avances {
            _id
            proyecto {
                _id
                nombre
            }
            fecha
            descripcion
            observaciones
            creadoPor {
                _id
                nombre
                apellido
            }
        }
    } 
`;

 const GET_AVANCE_BY_PROJECT = gql`
    query filtrarAvance($_id: String!) {
        filtrarAvance(_id: $_id) {
            _id
            proyecto {
                _id
                nombre
            }
            fecha
            descripcion
            observaciones
            creadoPor {
                identificacion
                nombre
                apellido
            }
        }
    } 
`; 

export { GET_AVANCES, GET_AVANCE_BY_PROJECT};