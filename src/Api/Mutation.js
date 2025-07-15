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

export const CreateUser = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $roleIds: [Int!]!
    $mobileNo: String!
    $userType: String
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      roleIds: $roleIds
      mobileNo: $mobileNo
      userType: $userType
    ) {
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

export const AddJob = gql`
mutation CreateJob($data: CreateJobInput!) {
  createJob(data: $data) {
    id
    title
    description
    department
    location
    experience
    salary
    vacancy
    status
    posted_date
    closing_date
    created_at
    created_by {
      id
      firstName
      lastName
      email
    }
  }
}
`;
