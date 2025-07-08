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


// export const UPDATE_JOB_MUTATION = gql`
//  mutation UpdateJob(
//   $id: ID!
//   $title: String
//   $description: String
//   $department: String
//   $location: String
//   $experience: String
//   $salary: Int
//   $vacancy: Int
//   $status: Boolean
//   $closing_date: String
// ) {
//   updateJob(
//     id: $id
//     title: $title
//     description: $description
//     department: $department
//     location: $location
//     experience: $experience
//     salary: $salary
//     vacancy: $vacancy
//     status: $status
//     closing_date: $closing_date
//   ) {
//     id
//     title
//     description
//     department
//     location
//     experience
//     salary
//     vacancy
//     status
//     posted_date
//     closing_date
//     created_at
//     created_by {
//       id
//       firstName
//       lastName
//       email
//     }
//   }
// }
// `;

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