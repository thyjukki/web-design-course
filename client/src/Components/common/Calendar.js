/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { Container, Button } from "react-bootstrap";
import {
  getDay,
  previousMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
  addWeeks,
} from "date-fns";

const Calendar = (props) => {
  const [weekOffset, setOffset] = useState(0);

  const current = new Date();
  const today = new Date(
    addWeeks(
      new Date(
        `${
          current.getMonth() + 1
        }/${current.getDate()}/${current.getFullYear()}`
      ),
      weekOffset
    )
  );
  const prevMon = new Date(previousMonday(today));
  const tue = new Date(nextTuesday(prevMon));
  const wed = new Date(nextWednesday(prevMon));
  const thu = new Date(nextThursday(prevMon));
  const fri = new Date(nextFriday(prevMon));
  const sat = new Date(nextSaturday(prevMon));
  const nextSun = new Date(nextSunday(today));

  const getWeek = () => {
    const dayNumber = getDay(today);
    if (dayNumber === 0) {
      console.log("SUNNUNTAI!");
      return `${prevMon.getDate()}.${
        prevMon.getMonth() + 1
      }-${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    } else if (dayNumber === 1) {
      console.log("MAANANTAI!");
      return `${today.getDate()}.${today.getMonth() + 1}-${nextSun.getDate()}.${
        nextSun.getMonth() + 1
      }.${nextSun.getFullYear()}`;
    } else {
      return `${prevMon.getDate()}.${
        prevMon.getMonth() + 1
      }-${nextSun.getDate()}.${
        nextSun.getMonth() + 1
      }.${nextSun.getFullYear()}`;
    }
  };

  return (
    <Container>
      <Header>
        <Button onClick={() => setOffset(weekOffset - 1)}>Vähennä</Button>
        <div>{getWeek()}</div>
        <Button onClick={() => setOffset(weekOffset + 1)}>Lisää</Button>
      </Header>
      <Canvas>
        <Week>
          <Day date={`ma ${prevMon.getDate()}.${prevMon.getMonth() + 1}`} />
          <Day date={`ti ${tue.getDate()}.${tue.getMonth() + 1}`} />
          <Day date={`ke ${wed.getDate()}.${wed.getMonth() + 1}`} />
          <Day date={`to ${thu.getDate()}.${thu.getMonth() + 1}`} />
          <Day date={`pe ${fri.getDate()}.${fri.getMonth() + 1}`} />
          <Day date={`la ${sat.getDate()}.${sat.getMonth() + 1}`} />
          <Day date={`su ${nextSun.getDate()}.${nextSun.getMonth() + 1}`} />
        </Week>
      </Canvas>
    </Container>
  );
};

const Day = (props) => {
  const { date } = props;
  return <div>{date}</div>;
};

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Canvas = styled.div`
  background-color: white;
  border: 5px solid black;
  height: 400px;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export default Calendar;
