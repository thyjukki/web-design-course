/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { Container, Button } from "react-bootstrap";
import { getDay, previousMonday, nextSunday, addWeeks } from "date-fns";

const Calendar = (props) => {
  const [weekOffset, setOffset] = useState(0);

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const getWeek = () => {
    const today = new Date(addWeeks(new Date(date), weekOffset));
    const dayNumber = getDay(today);
    if (dayNumber === 0) {
      const mon = new Date(previousMonday(today));
      return `${mon.getDate()}.${mon.getMonth()+1}-${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
    } else if (dayNumber === 1) {
      const sun = new Date(nextSunday(today));
      return `${today.getDate()}.${today.getMonth()+1}-${sun.getDate()}.${sun.getMonth()+1}.${sun.getFullYear()}`;
    } else {
      const mon = new Date(previousMonday(today));
      const sun = new Date(nextSunday(today));
      console.log(sun)
      return `${mon.getDate()}.${mon.getMonth()+1}-${sun.getDate()}.${sun.getMonth()+1}.${sun.getFullYear()}`;
    }
  };

  return (
    <Container>
      <Header>
        <Button onClick={() => setOffset(weekOffset - 1)} >Vähennä</Button>
        <div>{getWeek()}</div>
        <Button onClick={() => setOffset(weekOffset + 1)}>Lisää</Button>
      </Header>
      <Canvas>
        <Week>
          <Day />
          <Day />
        </Week>
      </Canvas>
    </Container>
  );
};

const Day = (props) => {
  return <div>Hello</div>;
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
