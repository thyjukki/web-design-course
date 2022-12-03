import React from "react"
import { useForm } from "react-hook-form"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"

const SEARCH_COURSES = gql`
  query Courses($searchWord: String!) {
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
  }
`

export const CourseSearch = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  const { loading, error, data } = useQuery(SEARCH_COURSES, {
    variables: { searchWord: watch("searchWord") },
    skip: watch("searchWord") === ""
  })

  error && console.error(JSON.stringify(error, null, 2))

  return (
    <SearchContainer>
      <form>
        <H2>Hae kurssia</H2>
        <input {...register("searchWord")} />
      </form>
      {errors.searchWord && <Error>{errors.searchWord?.message}</Error>}
      {error && <Error>{error.message}</Error>}
      {loading && <p>Ladataan...</p>}
      {data && (
        <Table>
          <thead>
            <tr>
              <Header>Kurssikoodi</Header>
              <Header>Nimi</Header>
              <Header>Opintopisteet</Header>
              <Header>Aika</Header>
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
                  <Detail>
                    {new Date(
                      Number(course.instances[0].startDate)
                    ).toLocaleDateString("fi-FI")}
                    {" - "}
                    {new Date(
                      Number(course.instances[0].endDate)
                    ).toLocaleDateString("fi-FI")}
                  </Detail>
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
