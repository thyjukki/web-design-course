/* eslint-disable */
import React, { useState, useRef } from "react";
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
  const mon = new Date(previousMonday(today));
  const tue = new Date(nextTuesday(mon));
  const wed = new Date(nextWednesday(mon));
  const thu = new Date(nextThursday(mon));
  const fri = new Date(nextFriday(mon));
  const sat = new Date(nextSaturday(mon));
  const sun = new Date(nextSunday(today));

  const getWeek = () => {
    const dayNumber = getDay(today);
    if (dayNumber === 0) {
      return `${mon.getDate()}.${mon.getMonth() + 1}-${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()}`;
    } else if (dayNumber === 1) {
      return `${today.getDate()}.${today.getMonth() + 1}-${sun.getDate()}.${
        sun.getMonth() + 1
      }.${sun.getFullYear()}`;
    } else {
      return `${mon.getDate()}.${mon.getMonth() + 1}-${sun.getDate()}.${
        sun.getMonth() + 1
      }.${sun.getFullYear()}`;
    }
  };

  const occasions = [
    {
      startTime: "30.11.2022:10.00",
      endTime: "30.11.2022:12.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "1.12.2022:10.00",
      endTime: "1.12.2022:12.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "3.12.2022:12.00",
      endTime: "2.12.2022:14.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "3.12.2022:14.00",
      endTime: "3.12.2022:16.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "29.11.2022:12.00",
      endTime: "29.11.2022:14.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "1.12.2022:12.00",
      endTime: "1.12.2022:14.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "2.12.2022:08.00",
      endTime: "2.11.2022:10.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
    {
      startTime: "2.12.2022:12.00",
      endTime: "2.12.2022:15.00",
      type: "luento",
      name: "Todennäköisyys ja tilasto",
    },
  ];

  const sortOccasions = (arr) => {
    const ret = {};
    arr.map((obj) => {
      const sTime = obj.startTime.split(":")[0];
      if (ret.hasOwnProperty(sTime)) {
        ret[sTime].push(obj);
      } else {
        ret[sTime] = [obj];
      }
    });
    return ret;
  };

  const occSorted = sortOccasions(occasions);

  return (
    <Container>
      <Header>
        <Button onClick={() => setOffset(weekOffset - 1)}>Vähennä</Button>
        <div>{getWeek()}</div>
        <Button onClick={() => setOffset(weekOffset + 1)}>Lisää</Button>
      </Header>
      <Canvas>
        <Week>
          <Day
            date={`ma ${mon.getDate()}.${mon.getMonth() + 1}`}
            occ={
              occSorted[
                `${mon.getDate()}.${mon.getMonth() + 1}.${mon.getFullYear()}`
              ]
            }
          />
          <Day
            date={`ti ${tue.getDate()}.${tue.getMonth() + 1}`}
            occ={
              occSorted[
                `${tue.getDate()}.${tue.getMonth() + 1}.${tue.getFullYear()}`
              ]
            }
          />
          <Day
            date={`ke ${wed.getDate()}.${wed.getMonth() + 1}`}
            occ={
              occSorted[
                `${wed.getDate()}.${wed.getMonth() + 1}.${wed.getFullYear()}`
              ]
            }
          />
          <Day
            date={`to ${thu.getDate()}.${thu.getMonth() + 1}`}
            occ={
              occSorted[
                `${thu.getDate()}.${thu.getMonth() + 1}.${thu.getFullYear()}`
              ]
            }
          />
          <Day
            date={`pe ${fri.getDate()}.${fri.getMonth() + 1}`}
            occ={
              occSorted[
                `${fri.getDate()}.${fri.getMonth() + 1}.${fri.getFullYear()}`
              ]
            }
          />
          <Day
            date={`la ${sat.getDate()}.${sat.getMonth() + 1}`}
            occ={
              occSorted[
                `${sat.getDate()}.${sat.getMonth() + 1}.${sat.getFullYear()}`
              ]
            }
          />
          <Day
            date={`su ${sun.getDate()}.${sun.getMonth() + 1}`}
            occ={
              occSorted[
                `${sun.getDate()}.${sun.getMonth() + 1}.${sun.getFullYear()}`
              ]
            }
          />
        </Week>
      </Canvas>
    </Container>
  );
};

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
  "23.00",
];

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
  "23.00": "00.00",
};

const sortTimes = (arr) => {
  const ret = {};
  arr.map((obj) => {
    const sTime = obj.startTime.split(":")[1];
    ret[sTime] = obj;
  });
  return ret;
};

const Day = (props) => {
  const { date, occ } = props;
  var occStatus = false;
  var startH = null;
  const sorted = occ && sortTimes(occ);

  return (
    <Container>
      {date}
      <FullDay>
        {hours.map((hour) => {
          if (occStatus) {
            if (sorted[startH].endTime.split(":")[1] === timeMatching[hour]) {
              occStatus = false;
              startH = null;
              return <EventEnd key={hour}/>;
            } else {
              return <EventMid key={hour}/>;
            }
          } else {
            if (sorted && sorted.hasOwnProperty(hour)) {
              occStatus = true;
              startH = hour;
              return <EventStart key={hour}>{`${hour}-${sorted[startH].endTime.split(":")[1]}`}</EventStart>;
            } else {
              return <Hour key={hour}>{hour}</Hour>;
            }
          }
        })}
      </FullDay>
    </Container>
  );
};

// const Monday = (props) => {
//   const { date, occ } = props;

//   return (
//     <Container>
//       {date}
//       <FullDay>
//         {hours.map((hour) => {
//           return (
//             <Hour id={hour.toString()} key={hour}>
//               {hour}
//             </Hour>
//           );
//         })}
//       </FullDay>
//     </Container>
//   );
// };


const FullDay = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 1fr);
`;

const Hour = styled.div`
  height: 50px;
  border: 2px solid grey;
`;

const EventStart = styled.div`
  height: 50px;
  border-top: 4px solid green;
  border-left: 4px solid green;
  border-right: 4px solid green;
`;

const EventMid = styled.div`
  height: 50px;
  border-left: 4px solid green;
  border-right: 4px solid green;
`;

const EventEnd = styled.div`
  height: 50px;
  border-bottom: 4px solid green;
  border-left: 4px solid green;
  border-right: 4px solid green;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Canvas = styled.div`
  background-color: white;
  border: 5px solid black;
  height: 600px;
  overflow: scroll;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export default Calendar;
