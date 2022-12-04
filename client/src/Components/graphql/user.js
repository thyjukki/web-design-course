import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const GET_USER_INFO = gql`
  query ($userId: Int!) {
    getUserInfo(userId: $userId) {
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
  query ($userId: Int!) {
    getCourseEnrollments(user: $userId) {
      instance {
        id
      }
    }
  }
`
