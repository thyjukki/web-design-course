import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const GET_USER_INFO = gql`
  query {
    getUserInfo {
      username
      email
      fullName
      roles {
        role
      }
      studyPlans {
        name
        children {
          name
        }
      }
    }
  }
`

export const GET_ENROLLMENT_INSTANCE_IDS = gql`
  query {
    getCourseEnrollments {
      instance {
        id
      }
    }
  }
`
