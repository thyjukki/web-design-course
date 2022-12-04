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
    <Container>
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
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding-top: 50px;
`

const CurrentCourses = styled.div``

const CourseCont = styled.div`
  padding: 2px;
`

export default FrontPage
