import { gql } from "@apollo/client"

export const SEARCH_COURSE_INSTANCES = gql`
  query ($searchWord: String!) {
    searchCourseInstances(word: $searchWord) {
      id
      parentCourse {
        code
        name
        description
        credits
      }
      startDate
      endDate
      signupStart
      signupEnd
      maxSize
      enrollments {
        id
      }
    }
  }
`

export const ENROLL_ON_COURSE = gql`
  mutation ($userId: Int!, $instanceId: Int!, $blockId: Int) {
    createCourseEnrollment(
      userId: $userId
      instanceId: $instanceId
      blockId: $blockId
    )
  }
`

export const REMOVE_ENROLLMENT = gql`
  mutation ($userId: Int!, $instanceId: Int!) {
    deleteCourseEnrollment(userId: $userId, instanceId: $instanceId)
  }
`
