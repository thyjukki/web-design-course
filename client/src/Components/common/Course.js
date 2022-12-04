import React from "react"
import styled from "styled-components"
import Accordion from "react-bootstrap/Accordion"
import { Container } from "react-bootstrap"
import Rand from "rand-seed"

const Course = (props) => {
  const { courseInstance } = props
  const { parentCourse } = courseInstance

  return (
    <BordContainer courseColor={getCourseColor(parentCourse.code)}>
      <Accordion defaultActiveKey="0">
        <Header courseColor={getCourseColor(parentCourse.code)}>
          <Cont>
            <Credits courseColor={getCourseColor(parentCourse.code)}>
              {parentCourse.credits}
            </Credits>
            <Wrapper>
              <div>{parentCourse.name}</div>
              <div>{`${getDate(courseInstance.startDate)}-${getDate(
                courseInstance.endDate
              )}`}</div>
            </Wrapper>
          </Cont>
        </Header>

        <Body courseColor={getCourseColor(parentCourse.code)}>
          <Container>
            <div>{/*courseInstance.type*/}</div>
            <Lecture events={courseInstance.occasions} />
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
            <div>{`${getDate(event.startDate)}-${getDate(event.endDate)}`}</div>
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

const getDate = (timestamp) => {
  const date = new Date(parseInt(timestamp))
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
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
