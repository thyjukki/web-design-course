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

export const GET_OCCASIONS_FOR_USER = gql`
  query GetOccasionsForUser($userId: ID) {
    getOccasionsForUser(user: $userId) {
      id
      instance {
        id
        startDate
        endDate
        signupStart
        signupEnd
        parentCourse {
          name
          code
        }
      }
      startDate
      endDate
    }
  }
`
