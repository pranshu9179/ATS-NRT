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



// export const CreateRoleApi = gql`
// mutation CreateRole($input: CreateRoleInput!) {
//   createRole(input: $input) {
//     id
//     name
//     slug
//     description
//     status
//     userType
//     created_at
//     updated_at
//     permissions {
//       id
//       name
//       slug
//       permission_group
//       description
//       created_at
//       updated_at
//       deleted_at
//       roles {
//         id
//         name
//         slug
//         description
//         status
//         userType
//         created_at
//         updated_at
       
//       }
//     }
//   }
// }`





// import { gql } from "@apollo/client";

// export const CreateRoleApi = gql`
//   mutation CreateRole($input: CreateRoleInput!) {
//     createRole(input: $input) {
//       id
//       name
//       status
//       userType
//       permissions {
//         id
//         name
//       }
//     }
//   }
// `;
