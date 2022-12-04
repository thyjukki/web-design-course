import React from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"
import styled from "styled-components"
import { Button } from "react-bootstrap"
import { GET_ENROLLMENT_INSTANCE_IDS } from "./graphql/user"
import { SEARCH_COURSE_INSTANCES } from "./graphql/course"
import { ENROLL_ON_COURSE } from "./graphql/course"
import { REMOVE_ENROLLMENT } from "./graphql/course"

export const CourseSearch = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  const user = parseInt(localStorage.getItem("user")) || 0

  const courseSearch = useQuery(SEARCH_COURSE_INSTANCES, {
    variables: { searchWord: watch("searchWord") },
    skip: watch("searchWord") === ""
  })

  const enrollments = useQuery(GET_ENROLLMENT_INSTANCE_IDS, {
    variables: { userId: user }
  })

  const [courseEnroll, enrollResult] = useMutation(ENROLL_ON_COURSE)
  const [removeEnroll, removeResult] = useMutation(REMOVE_ENROLLMENT)

  const handleEnroll = async (instance) => {
    await courseEnroll({
      variables: { userId: user, instanceId: instance },
      refetchQueries: [
        { query: GET_ENROLLMENT_INSTANCE_IDS, variables: { userId: user } }
      ]
    })
  }

  courseSearch.error &&
    console.error(JSON.stringify(courseSearch.error, null, 2))

  const handleRemove = async (instance) => {
    await removeEnroll({
      variables: { userId: user, instanceId: instance },
      refetchQueries: [
        { query: GET_ENROLLMENT_INSTANCE_IDS, variables: { userId: user } }
      ]
    })
  }

  return (
    <SearchContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        <H2>Hae kurssia</H2>
        <input {...register("searchWord")} />
      </form>
      {errors.searchWord && <Error>{errors.searchWord?.message}</Error>}
      {courseSearch.error && <Error>{courseSearch.error.message}</Error>}
      {courseSearch.loading && <p>Ladataan...</p>}
      {courseSearch.data && (
        <SearchResult>
          <h2>{`${courseSearch.data.searchCourseInstances.length} hakutulosta`}</h2>
          {courseSearch.data.searchCourseInstances.map((instance) => {
            return (
              <CourseInfo
                key={instance.id}
                instance={instance}
                enrollments={enrollments}
                handleEnroll={handleEnroll}
                handleRemove={handleRemove}
              />
            )
          })}
        </SearchResult>
      )}
    </SearchContainer>
  )
}

const CourseInfo = (props) => {
  const { instance, enrollments, handleEnroll, handleRemove } = props
  const { parentCourse } = instance

  const now = new Date()

  return (
    <InfoContainer key={parentCourse.code}>
      <InfoContent>
        <h4>{`${parentCourse.name} (${parentCourse.credits} op)`}</h4>
        <div>{`Kurssikoodi ${parentCourse.code}`}</div>
        <div>
          {`Opetusta ${new Date(Number(instance.startDate)).toLocaleDateString(
            "fi-FI"
          )}
           - 
          ${new Date(Number(instance.endDate)).toLocaleDateString("fi-FI")}`}
        </div>
        <div>
          {`Ilmoittautuminen ${new Date(
            Number(instance.signupStart)
          ).toLocaleDateString("fi-FI")}
           - 
          ${new Date(Number(instance.signupEnd)).toLocaleDateString("fi-FI")}`}
        </div>
      </InfoContent>
      <SignUpSection>
        {instance.signupStart < now && instance.signupEnd > now ? (
          <>
            <p>
              {instance.enrollments.length}/{instance.maxSize || "-"}
            </p>
            {enrollments.data &&
            enrollments.data.getCourseEnrollments.some(
              (enrollment) => enrollment.instance.id == instance.id
            ) ? (
              <Button
                onClick={() => handleRemove(instance.id)}
                className="btn btn-danger"
              >
                Peru ilmoittautuminen
              </Button>
            ) : (
              <Button onClick={() => handleEnroll(instance.id)} className="btn">
                Ilmoittaudu
              </Button>
            )}
          </>
        ) : (
          <>
            {instance.signupStart > now && (
              <p>Ilmoittautuminen ei ole vielä alkanut</p>
            )}
            {instance.signupEnd < now && <p>Ilmoittautuminen sulkeutunut</p>}
          </>
        )}
      </SignUpSection>
    </InfoContainer>
  )
}

const SearchContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SearchResult = styled.div``

const InfoContainer = styled.div`
  width: 800px;
  border-bottom: 1px solid #9b9b9b;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`

const SignUpSection = styled.div``

const InfoContent = styled.div``

const H2 = styled.h2`
  text-align: center;
`

const Error = styled.p`
  color: red;
`
