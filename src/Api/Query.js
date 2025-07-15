// import { AddJob } from "@/pages/jobManagement/AddJob";
import { gql } from "@apollo/client";

export const ListRoles = gql`
  query RolesList(
    $page: Int
    $limit: Int
    $search: String
    $status: Boolean
    $userType: String
    $sortBy: String
    $sortOrder: String
  ) {
    rolesList(
      page: $page
      limit: $limit
      search: $search
      status: $status
      userType: $userType
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      data {
        id
        name
        slug
        description
        status
        userType
        created_at
        updated_at
      }
      pagination {
        currentPage
        limit
        totalCount
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
      filters {
        search
        status
        userType
        sortBy
        sortOrder
      }
    }
  }
`;

export const PermissionList = gql`
  query PermissionList(
    $page: Int
    $limit: Int
    $search: String
    $permissionGroup: String
    $sortBy: String
    $sortOrder: String
  ) {
    permissionList(
      page: $page
      limit: $limit
      search: $search
      permission_group: $permissionGroup
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      data {
        id
        name
        slug
        permission_group
        description
        created_at
        updated_at
        deleted_at
      }
      pagination {
        currentPage
        limit
        totalCount
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
      filters {
        search
        permission_group
        sortBy
      }
    }
  }
`;

export const UsersList = gql`
  query UsersList(
    $page: Int
    $limit: Int
    $search: String
    $isverified: Boolean
    $userType: String
    $roleId: Int
    $sortBy: String
  ) {
    usersList(
      page: $page
      limit: $limit
      search: $search
      isverified: $isverified
      userType: $userType
      roleId: $roleId
      sortBy: $sortBy
    ) {
      data {
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
      pagination {
        currentPage
        limit
        totalCount
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
      filters {
        search
        isverified
        userType {
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
        roleId
        sortBy
      }
    }
  }
`;

export const UsersListQuery = gql`
  query UsersList($page: Int, $limit: Int) {
    usersList(page: $page, limit: $limit) {
      data {
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
      pagination {
        currentPage
        limit
        totalCount
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
      filters {
        userType {
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
    }
  }
`;
