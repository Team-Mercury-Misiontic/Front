import { gql } from '@apollo/client';


const GET_USERS = gql`
 query Users {
    Users {
      _id
      name
      last_name
      email
      status
      identification
      role
    }
  }
`;

const GET_USER = gql`
  query User($_id: String!) {
    User(_id: $_id) {
        _id
      name
      last_name
      email
      status
      identification
      role
    }
  }
`;

export { GET_USERS, GET_USER };
