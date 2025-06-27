import { gql } from "@apollo/client";

export const LoginApi = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      password
      role_names
      mobileNo
      userType
      is_blocked
      created_at
      updated_at
      token
    }
  }
`;
