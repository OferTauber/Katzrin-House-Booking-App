import { useGlobalContext } from '../../../../utils/context';
import { editReservation, deleteReservationAPI } from '../../../../utils/axios';

const Reservation = ({
  reservation,
  status,
  reservationsList,
  setReservationsList,
  setBookingIsOpen,
}) => {
  const { user, usersList } = useGlobalContext();

  const onInvitationCancelation = async (event, reservationId) => {
    event.stopPropagation();

    const tempReservationsList = [...reservationsList];
    const reservationToCancleIndex = tempReservationsList.findIndex(
      (reservation) => reservation.id + '' === reservationId + ''
    );

    const { owner, invited, open, id, from, to } = {
      ...tempReservationsList[reservationToCancleIndex],
    };

    const updatedInvited = invited.filter(
      (guestId) => guestId + '' !== user.id + ''
    );

    const updatedReservation = {
      owner,
      id,
      open,
      from: from._i,
      to: to._i,
      invited: updatedInvited,
    };

    tempReservationsList.splice(
      reservationToCancleIndex,
      1,
      updatedReservation
    );

    setReservationsList(tempReservationsList);
    editReservation(updatedReservation.id, updatedReservation);
  };

  const onInvitationAcception = (event, reservationId) => {
    event.stopPropagation();

    const tempReservationsList = [...reservationsList];
    const reservationToJoinIndex = tempReservationsList.findIndex(
      (reservation) => reservation.id + '' === reservationId + ''
    );

    const { owner, invited, open, id, from, to } = {
      ...tempReservationsList[reservationToJoinIndex],
    };

    invited.push(user.id);
    const updatedReservation = {
      owner,
      id,
      open,
      from: from._i,
      to: to._i,
      invited,
    };

    tempReservationsList.splice(reservationToJoinIndex, 1, updatedReservation);

    setReservationsList(tempReservationsList);
    editReservation(updatedReservation.id, updatedReservation);
  };

  const onReservationCancelation = (event, reservation) => {
    event.stopPropagation();

    if (reservation.invited[0]) {
      quitFromReservation(reservation);
    } else {
      deleteReservation(reservation);
    }
  };

  const deleteReservation = ({ id }) => {
    const tempReservationsList = [...reservationsList];
    const reservationToDeleteIndex = tempReservationsList.findIndex(
      (reservation) => reservation.id + '' === id + ''
    );
    tempReservationsList.splice(reservationToDeleteIndex, 1);
    setReservationsList(tempReservationsList);
    deleteReservationAPI(id);
  };

  const quitFromReservation = (calanderReservation) => {
    const tempReservationsList = [...reservationsList];
    const reservationToEditIndex = tempReservationsList.findIndex(
      (reserv) => reserv.id + '' === calanderReservation.id + ''
    );

    const { invited, open, id, from, to } = {
      ...tempReservationsList[reservationToEditIndex],
    };

    const newOwner = invited.shift();
    const updatedReservation = {
      owner: newOwner,
      open,
      from: from._i,
      to: to._i,
      invited,
      id,
    };

    tempReservationsList.splice(reservationToEditIndex, 1, updatedReservation);

    setReservationsList(tempReservationsList);
    editReservation(updatedReservation.id, updatedReservation);
  };

  const getUserNameById = (id) => {
    if (id + '' === user.id + '') return 'את/ה';
    return usersList[0].find((user) => {
      return user.id + '' === id + '';
    }).name_he;
  };

  const { onedByUser, open, userIsInvaited, dateIsFree } = status;
  if (dateIsFree)
    return (
      <div
        className="btn reservation-btn book"
        onClick={(e) => setBookingIsOpen(true)}
      >
        הזמן/י
      </div>
    );

  const { owner, invited } = reservation;
  const ownerName = getUserNameById(owner);
  const invtedNames = invited.map((user) => getUserNameById(user)).join(', ');

  return (
    <>
      <p className="owner">{ownerName}</p>

      {invtedNames && (
        <>
          <p>*</p>
          <div className="invided-list">
            <p>מצטרפים: {invtedNames}</p>
          </div>
        </>
      )}
      {onedByUser && (
        <div
          className="btn cancel-owne reservation-btn"
          onClick={(e) => onReservationCancelation(e, reservation)}
        >
          בטל/י
        </div>
      )}
      {userIsInvaited && (
        <div
          className="btn cancel-join reservation-btn"
          onClick={(e) => {
            onInvitationCancelation(e, reservation.id);
          }}
        >
          צא/י
        </div>
      )}
      {!onedByUser && open && !userIsInvaited && (
        <div
          className="btn join reservation-btn"
          onClick={(e) => {
            onInvitationAcception(e, reservation.id);
          }}
        >
          גם אני!
        </div>
      )}
      {!onedByUser && !open && (
        <p className="close-massege">זוהי הזמנה סגורה</p>
      )}
    </>
  );
};

export default Reservation;
