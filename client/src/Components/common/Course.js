import React from "react"
import styled from "styled-components"
import Accordion from "react-bootstrap/Accordion"
import { Container } from "react-bootstrap"
import Rand from "rand-seed"

const Course = (props) => {
  const { course } = props
  const { courseInstance } = course

  return (
    <BordContainer courseColor={getCourseColor(course.code)}>
      <Accordion defaultActiveKey="0">
        <Header courseColor={getCourseColor(course.code)}>
          <Cont>
            <Credits courseColor={getCourseColor(course.code)}>
              {course.credits}
            </Credits>
            <Wrapper>
              <div>{course.name}</div>
              <div>{`${courseInstance.startDate}-${courseInstance.endDate}`}</div>
            </Wrapper>
          </Cont>
        </Header>

        <Body courseColor={getCourseColor(course.code)}>
          <Container>
            <div>{courseInstance.type}</div>
            <Lecture events={courseInstance.events} />
          </Container>
        </Body>
      </Accordion>
    </BordContainer>
  )
}

const Lecture = (props) => {
  const { events } = props
  return (
    <Container>
      <div>Aika- ja paikkatiedot</div>
      {events.map((event) => {
        return (
          <Container key={event.startDate}>
            <div>{`${event.startDate}-${event.endDate}`}</div>
            <div>{event.location}</div>
          </Container>
        )
      })}
    </Container>
  )
}

const courseColors = ["#f1b963", "#dde0ab", "#97cba9", "#668ba4"]

function getDecimalPart(num) {
  if (Number.isInteger(num)) {
    return 0
  }

  const decimalStr = num.toString().split(".")[1].slice(0, 3)
  return Number(decimalStr)
}

const getCourseColor = (courseName) => {
  const rand = new Rand(courseName)
  return courseColors[getDecimalPart(rand.next()) % 4]
}

const BordContainer = styled.div`
  border: 2px solid ${(p) => p.courseColor};
`

const Header = styled(Accordion.Header)`
  width: 400px;
  height: 90px;
  display: flex;
`

const Cont = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

const Credits = styled.div`
  background-color: ${(p) => p.courseColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 90px;
  width: 20px;
`

const Body = styled(Accordion.Body)`
  max-width: 400px;
  background-color: rgba(155, 155, 155, 0.2);
  border-left: 20px solid ${(p) => p.courseColor};
`

export default Course
