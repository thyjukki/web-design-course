import React, { useEffect } from "react"
import Course from "./common/Course"
import { useLazyQuery } from "@apollo/client"
import styled from "styled-components"
import { GET_COURSE_ENROLLMENTS } from "./graphql/user"

import Calendar from "./common/Calendar"

const FrontPage = () => {
  const [getEnrollments, { error, loading, data }] = useLazyQuery(
    GET_COURSE_ENROLLMENTS
  )

  error && console.error(JSON.stringify(error, null, 2))
  useEffect(() => {
    const user = localStorage.getItem("user") || ""
    if (user) {
      getEnrollments({ variables: { user: parseInt(user) } })
    }
  }, [])

  error && console.error(error)
  return (
    <Cont>
      {loading && <p>Loading</p>}
      {error && <p>Error: {error.message}</p>}
      <Calendar />

      <CurrentCourses>
        <h2>Aktiiviset opinnot</h2>
        {data?.getCourseEnrollments.map((enrollment) => {
          return (
            <CourseCont key={enrollment.instance.parentCourse.code}>
              <Course courseInstance={enrollment.instance} />
            </CourseCont>
          )
        })}
      </CurrentCourses>
    </Cont>
  )
}

const exampleCourses = [
  {
    name: "User-Centered Methods for Product and Service Design",
    credits: 5,
    code: "TU-101",
    courseInstance: {
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
    }
  },
  {
    name: "Todennäköisyys ja tilastotiede",
    credits: 5,
    code: "MS-501",
    courseInstance: {
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
    }
  }
]

const Cont = styled.div`
  display: flex;
  padding-top: 50px;
`

const CurrentCourses = styled.div``

const CourseCont = styled.div`
  padding: 2px;
`

const Padd = styled.div`
  width: 100%;
  height: 20px;
`

export default FrontPage
