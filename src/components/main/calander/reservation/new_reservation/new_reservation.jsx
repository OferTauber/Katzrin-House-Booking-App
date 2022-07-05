import './new_reservation.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { postNewReservation } from '../../../../../utils/axios';
import { useUser } from '../../../../../utils/context';

const NewReservation = ({
  setBookingIsOpen,
  setReservationsList,
  reservationsList,
  date,
}) => {
  const [from, setFrom] = useState(date.format('YYYY-MM-DD'));
  const [to, setTo] = useState(date.clone().format('YYYY-MM-DD'));
  const [reservatonDates, setReservationDates] = useState([]);
  const [datesAreFree, setDatesAreFree] = useState(true);
  const [openInvitation, setOpenInvitation] = useState(true);
  const { user } = useUser();
  // console.log(reservationsList);
  const allTakenDates = findAllTakenDates(reservationsList);

  useEffect(() => {
    const allDaysOfReservation = findAllDaysOfReservation(from, to);
    setReservationDates(allDaysOfReservation);
  }, [from, to]);

  useEffect(() => {
    setDatesAreFree(areAllDatesFree(allTakenDates, reservatonDates));
  }, [reservatonDates, allTakenDates]);

  const onNewReservation = () => {
    if (!datesAreFree) return;
    const newReservation = createNewReservation(
      user.id,
      openInvitation,
      from,
      to
    );

    postNewReservation(newReservation);
    addDatesArr(newReservation);
    updateReservationList(newReservation);
  };

  const updateReservationList = (newReservation) => {
    const tempReservationsList = [...reservationsList];
    tempReservationsList.push(newReservation);
    setReservationsList(tempReservationsList);
    setBookingIsOpen(false);
  };

  return (
    <dialog open className="new-reservation column">
      <h1>הזמנה חדשה :</h1>
      <div className="new-reservation-box">
        <h4>מתאריך:</h4>
        <input
          type="date"
          value={from}
          max={to}
          onChange={(e) => {
            onDateChange(e, setFrom);
          }}
        />
      </div>
      <div className="new-reservation-box">
        <h4>עד תאריך:</h4>
        <input
          type="date"
          value={to}
          min={from}
          onChange={(e) => {
            onDateChange(e, setTo);
          }}
        />
      </div>
      <div className="new-reservation-open">
        <input
          type="checkbox"
          id="is-open"
          checked={openInvitation}
          onChange={(e) => setOpenInvitation(e.target.checked)}
        />
        <label htmlFor="is-open">משתמשים אחרים יכולים להצטרף להזמנה</label>
      </div>
      <div className="new-reservation-btns">
        <div className="btn" onClick={onNewReservation}>
          {datesAreFree ? 'שמירת הזמנה' : 'התאריך תפוס'}
        </div>
        <div
          className="btn"
          onClick={() => {
            setBookingIsOpen(false);
          }}
        >
          ביטול
        </div>
      </div>
    </dialog>
  );
};

export default NewReservation;

const onDateChange = (event, callback) => {
  callback(event.target.value);
};

const findAllTakenDates = (reservationsList) => {
  const allTakenDates = [];
  // console.log(reservationsList);
  // console.log(reservationsList[0]);
  // console.log(reservationsList[0].datesArr);
  for (const reservation of reservationsList) {
    if (!reservation.datesArr) reservation.datesArr = [];
    reservation.datesArr.reduce((acc, cur) => {
      acc.push(cur.format('YYYY-MM-DD'));
      return acc;
    }, allTakenDates);
  }

  return allTakenDates;
};

const findAllDaysOfReservation = (from, to) => {
  const momentFrom = moment(from);
  const reservationDays = [momentFrom.format('YYYY-MM-DD')];
  let i = 1;
  while (reservationDays[0] !== to) {
    const tempMoment = momentFrom.clone();
    tempMoment.add(i, 'day');
    reservationDays.unshift(tempMoment.format('YYYY-MM-DD'));
    i++;
  }
  return reservationDays;
};

const areAllDatesFree = (allTakenDates, reservatonDates) => {
  for (const reservationDay of reservatonDates) {
    if (allTakenDates.includes(reservationDay)) return false;
  }

  return true;
};

const createNewReservation = (owner, open, from, to) => {
  return {
    owner,
    open,
    from,
    to,
    invited: [],
    id: '10000',
  };
};

const addDatesArr = (reservation) => {
  const fromMoment = moment(reservation.from);
  const toMoment = moment(reservation.to);
  reservation.datesArr = [fromMoment.clone()];
  while (!reservation.datesArr[0].isSame(toMoment)) {
    fromMoment.add(1, 'day');
    reservation.datesArr.unshift(fromMoment.clone());
  }
};
