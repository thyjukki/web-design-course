import React from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@apollo/client"
import styled from "styled-components"
import { Button, Table } from "react-bootstrap"
import { GET_ENROLLMENT_INSTANCE_IDS } from "./graphql/user"
import { SEARCH_COURSE_INSTANCES } from "./graphql/course"

export const CourseSearch = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  const courseSearch = useQuery(SEARCH_COURSE_INSTANCES, {
    variables: { searchWord: watch("searchWord") },
    skip: watch("searchWord") === ""
  })

  const enrollments = useQuery(GET_ENROLLMENT_INSTANCE_IDS)

  courseSearch.error &&
    console.error(JSON.stringify(courseSearch.error, null, 2))
  enrollments.error && console.error(JSON.stringify(enrollments.error, null, 2))
  enrollments.data && console.log(enrollments.data)

  return (
    <SearchContainer>
      <form>
        <H2>Hae kurssia</H2>
        <input {...register("searchWord")} />
      </form>
      {errors.searchWord && <Error>{errors.searchWord?.message}</Error>}
      {courseSearch.error && <Error>{courseSearch.error.message}</Error>}
      {courseSearch.loading && <p>Ladataan...</p>}
      {courseSearch.data && (
        <TableContainer>
          <Table striped bordered hover>
            <thead>
              <tr>
                <Header>Kurssikoodi</Header>
                <Header>Nimi</Header>
                <Header>Opintopisteet</Header>
                <Header>Aika</Header>
                <Header>Ilmoittautuminen</Header>
                {/* TODO: Lisää kenttiä näkyviin kun expandaa */}
              </tr>
            </thead>
            <tbody>
              {courseSearch.data.searchCourseInstances.map(
                (instance, index) => (
                  <Row key={index}>
                    <Detail>{instance.parentCourse.code}</Detail>
                    <Detail>{instance.parentCourse.name}</Detail>
                    <Detail>{instance.parentCourse.credits}</Detail>
                    <Detail>
                      {new Date(Number(instance.startDate)).toLocaleDateString(
                        "fi-FI"
                      )}
                      {" - "}
                      {new Date(Number(instance.endDate)).toLocaleDateString(
                        "fi-FI"
                      )}
                    </Detail>
                    <Detail>
                      {enrollments.data &&
                      enrollments.data.getCourseEnrollments.some(
                        (enrollment) => enrollment.instance.id == instance.id
                      ) ? (
                        <Button className="btn btn-danger">
                          Peru ilmoittautuminen
                        </Button>
                      ) : (
                        <Button className="btn">Ilmoittaudu</Button>
                      )}
                    </Detail>
                  </Row>
                )
              )}
            </tbody>
          </Table>
        </TableContainer>
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

const TableContainer = styled.div`
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
