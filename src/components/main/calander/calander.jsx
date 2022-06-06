import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calander.css';
import buildCalander from './build';
import dayStyle from './stylers';
import CalanderHeader from './calander_header';
// import data from '../reservations/temp_data';
import Reservation from './reservation/reservation';
import Spinner from '../../../utils/spinner';
import { useUser } from '../../../utils/context';
import reservationType from './reservation/reservation_type';
import { getAllReservations, postReservation } from '../../../utils/axios';

function Calander() {
  const [calander, setCalander] = useState([]);
  const [value, setValue] = useState(moment());
  const [reservationsList, setReservationsList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchReservationList = async () => {
      const fetchedData = await getAllReservations();
      console.log(fetchedData);
      setReservationsList(fetchedData);
    };
    // for (const res of data) {
    //   postReservation(res);
    // }
    fetchReservationList();
  }, []);

  useEffect(() => {
    setCalander(buildCalander(value, reservationsList));
  }, [reservationsList, value]);

  if (!reservationsList[0]) return <Spinner />;

  return (
    <div className="calander-container container">
      <div className="calander">
        <CalanderHeader value={value} setValue={setValue} />
        <div className="calander-body">
          {calander.map((week, index) => (
            <div className="week" key={`w${index}`}>
              {week.map((day, index) => {
                const type = reservationType(day.reservation, user);
                // const style = dayStyle(day, value, type);
                return (
                  <div
                    key={`d${index}`}
                    className={`day ${dayStyle(day, value, type)}`}
                    onClick={() => {
                      setValue(day.date);
                    }}
                  >
                    {day.date.format('D').toString()}
                    <Reservation reservation={day.reservation} status={type} />
                    <br />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Calander;
