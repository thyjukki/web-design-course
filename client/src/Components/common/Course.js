import React from "react"
import styled from "styled-components"
import Accordion from "react-bootstrap/Accordion"
import { Container } from "react-bootstrap"

const Course = (props) => {
  const { course, courseInstance } = props
  console.log(courseInstance)
  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Header>
          <Container>
            <div>{course.name}</div>
            <div>{`${courseInstance.startDate}-${courseInstance.endDate}`}</div>
          </Container>
        </Header>

        <Body>
          <Container>
            <div>{courseInstance.type}</div>
            <Lecture events={courseInstance.events} />
          </Container>
        </Body>
      </Accordion>
    </Container>
  )
};

const Lecture = (props) => {
  const { events } = props
  return (
    <Container>
      <div>Aika- ja paikkatiedot</div>
      {events.map((event) => {
        return (
          <>
            <div>{`${event.startDate}-${event.endDate}`}</div>
            <div>{event.location}</div>
          </>
        )
      })}
    </Container>
  )
};

const Header = styled(Accordion.Header)`
  border: 2px solid black;
  width: 400px;
`

const Body = styled(Accordion.Body)`
  max-width: 400px;
`

export default Course
