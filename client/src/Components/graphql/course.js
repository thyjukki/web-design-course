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
    }
  }
`
