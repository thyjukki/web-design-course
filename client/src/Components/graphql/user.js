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
  query GetOccasionsForUser($userId: Int) {
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
export const GET_COURSE_ENROLLMENTS = gql`
  query GetCourseEnrollments($user: Int!) {
    getCourseEnrollments(user: $user) {
      id
      instance {
        id
        parentCourse {
          code
          name
          credits
        }
        startDate
        endDate
        occasions {
          id
          endDate
          startDate
          type
          location
        }
      }
    }
  }
`
