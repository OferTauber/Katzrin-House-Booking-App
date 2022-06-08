import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calander.css';
import buildCalander from './build';
import dayStyle from './stylers';
import CalanderHeader from './calander_header';
import Reservation from './reservation/reservation';
import Spinner from '../../../utils/spinner';
import { useUser } from '../../../utils/context';
import reservationType from './reservation/reservation_type';
import { getAllReservations } from '../../../utils/axios';
import NewReservation from './reservation/new_reservation/new_reservation';

function Calander() {
  const [calander, setCalander] = useState([]);
  const [value, setValue] = useState(moment());
  const [reservationsList, setReservationsList] = useState([]);
  const { user } = useUser();
  const [bookinIsOpen, setBookingIsOpen] = useState(false);

  useEffect(() => {
    const fetchReservationList = async () => {
      const fetchedData = await getAllReservations();

      setReservationsList(fetchedData);
    };

    fetchReservationList();
  }, []);

  useEffect(() => {
    setCalander(buildCalander(value, reservationsList));
  }, [reservationsList, value]);

  if (!reservationsList[0]) return <Spinner />;

  return (
    <div className="calander-container container">
      {bookinIsOpen && (
        <NewReservation
          setBookingIsOpen={setBookingIsOpen}
          setReservationsList={setReservationsList}
          reservationsList={reservationsList}
          date={value}
        />
      )}
      <div className="calander">
        <CalanderHeader value={value} setValue={setValue} />
        <div className="calander-body">
          {calander.map((week, index) => (
            <div className="week" key={`w${index}`}>
              {week.map((day, index) => {
                const type = reservationType(day.reservation, user);

                return (
                  <div
                    key={`d${index}`}
                    className={`day ${dayStyle(day, value, type)}`}
                    onClick={() => {
                      setValue(day.date);
                    }}
                  >
                    {day.date.format('D').toString()}
                    <Reservation
                      reservation={day.reservation}
                      status={type}
                      reservationsList={reservationsList}
                      setReservationsList={setReservationsList}
                      setBookingIsOpen={setBookingIsOpen}
                    />
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
