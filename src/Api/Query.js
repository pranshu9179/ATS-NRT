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
        sortOrder
      }
    }
  }
`;
