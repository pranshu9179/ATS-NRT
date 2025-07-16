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

export const CreateJob = gql`
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
    }
  }
}
`;


export const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJob(
    $id: ID!
    $data: UpdateJobInput! # Changed: Now taking a single 'data' object
  ) {
    updateJob(
      id: $id
      data: $data # Changed: Passing data via the 'data' object
    ) {
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


export const DeleteJobMutation = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;

export const UpdateRoleApi = gql`
  mutation UpdateRole($input: UpdateRoleInput!, $updateRoleId: ID!) {
    updateRole(input: $input, id: $updateRoleId) {
      id
      name
      slug
      description
      status
      userType
      created_at
      updated_at
      permissions {
        id
        name
        slug
        permission_group
        description
        created_at
        updated_at
        deleted_at
        roles {
          id
          name
          slug
          description
          status
          userType
          created_at
          updated_at
        }
      }
    }
  }
`;

