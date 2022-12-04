import React from "react"
import { useForm } from "react-hook-form"
import { gql, useQuery, useMutation } from "@apollo/client"
import styled from "styled-components"

const SEARCH_COURSES = gql`
  query ($searchWord: String!) {
    searchCourses(word: $searchWord) {
      code
      name
      description
      credits
      instances {
        lecturer {
          fullName
        }
        startDate
        endDate
        signupStart
        signupEnd
      }
    }
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
const DELETE_COURSE = gql`
  mutation Mutation($code: String!) {
    deleteCourse(code: $code)
  }
`

export const ManageCourses = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  const { loading, error, data } = useQuery(SEARCH_COURSES, {
    variables: { searchWord: watch("searchWord") },
    //skip: watch("searchWord") === ""
  })

  const [deleteCourse, { errorDelete }] = useMutation(DELETE_COURSE)

  error && console.error(JSON.stringify(error, null, 2))
  errorDelete && console.error(JSON.stringify(error, null, 2))

  return (
    <SearchContainer>
      <form>
        <H2>Hallitse kursseja</H2>
        <input {...register("searchWord")} />
      </form>
      <a href="/create-course">
        <button> Luo kurssi </button>
      </a>

      {errors.searchWord && <Error>{errors.searchWord?.message}</Error>}
      {error && <Error>{error.message}</Error>}
      {errorDelete && <Error>{errorDelete.message}</Error>}
      {loading && <p>Ladataan...</p>}
      {data && (
        <Table>
          <thead>
            <tr>
              <Header>Kurssikoodi</Header>
              <Header>Nimi</Header>
              <Header>Opintopisteet</Header>
              <Header>Instansit</Header>
              {/* TODO: Lisää kenttiä näkyviin kun expandaa */}
            </tr>
          </thead>
          <tbody>
            {data.searchCourses.map((course, index) => (
              <Row key={index}>
                <Detail>{course.code}</Detail>
                <Detail>{course.name}</Detail>
                <Detail>{course.credits}</Detail>
                {course.instances && (
                  <Detail>{course.instances.length}</Detail>
                )}
                {data?.getUserInfo.roles.some(x  => x.role === "teacher") &&  (
                  <button onClick={() => deleteCourse({variables: {code: course.code}})}>Delete</button>
                )}
              </Row>
            ))}
          </tbody>
        </Table>
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const H2 = styled.h2`
  text-align: center;
`

const Error = styled.p`
  color: red;
`

const Table = styled.table`
  margin-top: 3rem;
`

const Row = styled.tr`
  border: 2px solid black;
`

const Header = styled.th`
  padding: 1rem;
`

const Detail = styled.td`
  padding: 1rem;
`
