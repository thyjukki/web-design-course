import React from "react"
import "./FrontPage.css"
import Course from "./common/Course"
import { gql, useQuery } from "@apollo/client"

const COURSES = gql`
  query {
    getCourses {
      code
      name
    }
  }
`

const FrontPage = () => {
  const { loading, error, data } = useQuery(COURSES)
  error && console.error(error)
  data && console.log(data)
  return (
    <div>
      Hello World!
      {loading && <p>Loading</p>}
      {error && <p>Error: {error.message}</p>}
      <Course
        course={{
          name: "User-Centered Methods for Product and Service Design",
          credits: 5
        }}
        courseInstance={{
          type: "Luento",
          startDate: "5.9.2022",
          endDate: "7.12.2022",
          events: [
            {
              startDate: "5.9.2022",
              endDate: "12.9.2022",
              type: "Luento",
              location: "T2 - C105 - Tietotekniikan talo"
            },
            {
              startDate: "26.9.2022",
              endDate: "10.10.2022",
              type: "Luento",
              location: "T2 - C105 - Tietotekniikan talo"
            },
            {
              startDate: "24.10.2022",
              endDate: "5.12.2022",
              type: "Luento",
              location: "T2 - C105 - Tietotekniikan talo"
            }
          ]
        }}
      />
    </div>
  )
}

export default FrontPage
