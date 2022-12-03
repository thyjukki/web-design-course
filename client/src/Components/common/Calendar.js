import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Container, Button } from "react-bootstrap"
import {
  getDay,
  previousMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
  addWeeks
} from "date-fns"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Rand from "rand-seed"

const Calendar = (props) => {
  const [weekOffset, setOffset] = useState(0)
  const myRef = useRef(null)

  useEffect(() => {
    myRef.current.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "start"
    })
  })

  const current = new Date()
  const today = new Date(
    addWeeks(
      new Date(
        `${
          current.getMonth() + 1
        }/${current.getDate()}/${current.getFullYear()}`
      ),
      weekOffset
    )
  )
  const mon = new Date(previousMonday(today))
  const tue = new Date(nextTuesday(mon))
  const wed = new Date(nextWednesday(mon))
  const thu = new Date(nextThursday(mon))
  const fri = new Date(nextFriday(mon))
  const sat = new Date(nextSaturday(mon))
  const sun = new Date(nextSunday(today))

  const getWeek = () => {
    const dayNumber = getDay(today)
    if (dayNumber === 0) {
      return `${mon.getDate()}.${mon.getMonth() + 1}-${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()}`
    } else if (dayNumber === 1) {
      return `${today.getDate()}.${today.getMonth() + 1}-${sun.getDate()}.${
        sun.getMonth() + 1
      }.${sun.getFullYear()}`
    } else {
      return `${mon.getDate()}.${mon.getMonth() + 1}-${sun.getDate()}.${
        sun.getMonth() + 1
      }.${sun.getFullYear()}`
    }
  }

  const occasions = [
    {
      startTime: "30.11.2022:10.00",
      endTime: "30.11.2022:12.00",
      type: "luento",
      courseCode: "CS-101",
      name: "Tietotekniikan alkeet"
    },
    {
      startTime: "1.12.2022:10.00",
      endTime: "1.12.2022:12.00",
      type: "luento",
      courseCode: "CS-102",
      name: "Tietotekniikan jatkokurssi"
    },
    {
      startTime: "3.12.2022:12.00",
      endTime: "2.12.2022:14.00",
      type: "luento",
      courseCode: "TU-101",
      name: "Tuotantotalous 1"
    },
    {
      startTime: "3.12.2022:14.00",
      endTime: "3.12.2022:16.00",
      type: "luento",
      courseCode: "MS-501",
      name: "Todennäköisyys ja tilasto"
    },
    {
      startTime: "29.11.2022:12.00",
      endTime: "29.11.2022:14.00",
      type: "luento",
      courseCode: "MS-502",
      name: "Todennäköisyys ja tilasto"
    },
    {
      startTime: "1.12.2022:12.00",
      endTime: "1.12.2022:14.00",
      type: "luento",
      courseCode: "MS-503",
      name: "Todennäköisyys ja tilasto"
    },
    {
      startTime: "2.12.2022:08.00",
      endTime: "2.11.2022:10.00",
      type: "luento",
      courseCode: "CS-101",
      name: "Todennäköisyys ja tilastotieteen peruskurssi"
    },
    {
      startTime: "2.12.2022:12.00",
      endTime: "2.12.2022:15.00",
      type: "luento",
      courseCode: "CS-102",
      name: "Todennäköisyys ja tilasto"
    }
  ]

  const sortOccasions = (arr) => {
    const ret = {}
    arr.map((obj) => {
      const sTime = obj.startTime.split(":")[0]
      if (ret.hasOwnProperty(sTime)) {
        ret[sTime].push(obj)
      } else {
        ret[sTime] = [obj]
      }
    })
    return ret
  }

  const occSorted = sortOccasions(occasions)

  return (
    <Container>
      <Header>
        <Button onClick={() => setOffset(weekOffset - 1)}>
          <FaChevronLeft />
          <Offset />
        </Button>
        <CurrWeek>{getWeek()}</CurrWeek>
        <Button onClick={() => setOffset(weekOffset + 1)}>
          <FaChevronRight />
          <Offset />
        </Button>
      </Header>
      <WeekDays>
        <div />
        <DateHeader>{`ma ${mon.getDate()}.${mon.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`ti ${tue.getDate()}.${tue.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`ke ${wed.getDate()}.${wed.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`to ${thu.getDate()}.${thu.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`pe ${fri.getDate()}.${fri.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`la ${sat.getDate()}.${sat.getMonth() + 1}`}</DateHeader>
        <DateHeader>{`su ${sun.getDate()}.${sun.getMonth() + 1}`}</DateHeader>
        <EndLine />
      </WeekDays>
      <Canvas>
        <Week>
          <Times myRef={myRef} />
          <Day
            occ={
              occSorted[
                `${mon.getDate()}.${mon.getMonth() + 1}.${mon.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${tue.getDate()}.${tue.getMonth() + 1}.${tue.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${wed.getDate()}.${wed.getMonth() + 1}.${wed.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${thu.getDate()}.${thu.getMonth() + 1}.${thu.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${fri.getDate()}.${fri.getMonth() + 1}.${fri.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${sat.getDate()}.${sat.getMonth() + 1}.${sat.getFullYear()}`
              ]
            }
          />
          <Day
            occ={
              occSorted[
                `${sun.getDate()}.${sun.getMonth() + 1}.${sun.getFullYear()}`
              ]
            }
          />
        </Week>
      </Canvas>
    </Container>
  )
}

const Times = (props) => {
  const { myRef } = props

  return (
    <FullDay>
      {hours.map((hour) => {
        if (hour === "07.00") {
          return (
            <Hour ref={myRef} key={hour}>
              {hour}
            </Hour>
          )
        } else {
          return <Hour key={hour}>{hour}</Hour>
        }
      })}
    </FullDay>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`

const CurrWeek = styled.div`
  margin: 0 20px 0 20px;
  display: flex;
  align-items: center;
`

const Canvas = styled.div`
  background-color: white;
  height: 600px;
  overflow: scroll;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
`

const Week = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
`
const WeekDays = styled.div`
  display: grid;
  grid-template-columns: 59px repeat(7, 1fr) 17px;
`

const Offset = styled.div`
  height: 4px;
`

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-left: 1px solid grey;
`
const EndLine = styled.div`
  border-left: 1px solid grey;
`

const hours = [
  "00.00",
  "01.00",
  "02.00",
  "03.00",
  "04.00",
  "05.00",
  "06.00",
  "07.00",
  "08.00",
  "09.00",
  "10.00",
  "11.00",
  "12.00",
  "13.00",
  "14.00",
  "15.00",
  "16.00",
  "17.00",
  "18.00",
  "19.00",
  "20.00",
  "21.00",
  "22.00",
  "23.00"
]

const timeMatching = {
  "00.00": "01.00",
  "01.00": "02.00",
  "02.00": "03.00",
  "03.00": "04.00",
  "04.00": "05.00",
  "05.00": "06.00",
  "06.00": "07.00",
  "07.00": "08.00",
  "08.00": "09.00",
  "09.00": "10.00",
  "10.00": "11.00",
  "11.00": "12.00",
  "12.00": "13.00",
  "13.00": "14.00",
  "14.00": "15.00",
  "15.00": "16.00",
  "16.00": "17.00",
  "17.00": "18.00",
  "18.00": "19.00",
  "19.00": "20.00",
  "20.00": "21.00",
  "21.00": "22.00",
  "22.00": "23.00",
  "23.00": "00.00"
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

const Day = (props) => {
  const { occ } = props
  let occStatus = false
  let startH = null

  const sortTimes = (arr) => {
    const ret = {}
    arr.map((obj) => {
      const sTime = obj.startTime.split(":")[1]
      ret[sTime] = obj
    })
    return ret
  }

  const sorted = occ && sortTimes(occ)

  return (
    <FullDay>
      {hours.map((hour) => {
        if (occStatus) {
          if (sorted[startH].endTime.split(":")[1] === timeMatching[hour]) {
            const eventColour = getCourseColor(sorted[startH].courseCode)
            occStatus = false
            startH = null
            return <EventEnd key={hour} courseColor={eventColour} />
          } else {
            return (
              <EventMid
                key={hour}
                courseColor={getCourseColor(sorted[startH].courseCode)}
              />
            )
          }
        } else {
          if (sorted && sorted.hasOwnProperty(hour)) {
            occStatus = true
            startH = hour
            return (
              <EventStart
                key={hour}
                time={`${hour}-${sorted[startH].endTime.split(":")[1]}`}
                courseColor={getCourseColor(sorted[startH].courseCode)}
                courseName={sorted[startH].name}
              />
            )
          } else {
            return (
              <Hour key={hour}>
                <Line />
              </Hour>
            )
          }
        }
      })}
    </FullDay>
  )
}

const EventStart = (props) => {
  const { time, courseName, courseColor } = props
  return (
    <EventStartStyle courseColor={courseColor}>
      <EventTime courseColor={courseColor}>{time}</EventTime>
      <EventName>{courseName}</EventName>
    </EventStartStyle>
  )
}

const FullDay = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  border-right: 1px solid #9b9b9b;
`

const Hour = styled.div`
  height: 50px;
  border-bottom: 0.5px solid #9b9b9b;
  border-top: 0.5px solid #9b9b9b;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Line = styled.div`
  width: 100%;
  border-top: 0.5px dotted #9b9b9b;
  position: relative;
`

const EventStartStyle = styled.div`
  height: 50px;
  border-top: 4px solid ${(p) => p.courseColor};
  border-left: 4px solid ${(p) => p.courseColor};
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  background-color: rgba(155, 155, 155, 0.2);
`

const EventMid = styled.div`
  height: 50px;
  border-left: 4px solid ${(p) => p.courseColor};
  background-color: rgba(155, 155, 155, 0.2);
`

const EventEnd = styled.div`
  height: 50px;
  border-left: 4px solid ${(p) => p.courseColor};
  background-color: rgba(155, 155, 155, 0.2);
  border-radius: 0 0 6px 6px;
`

const EventTime = styled.div`
  background-color: ${(p) => p.courseColor};
`

const EventName = styled.div`
  padding-left: 3px
`;

export default Calendar
