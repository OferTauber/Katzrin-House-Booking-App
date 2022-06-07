import { useGlobalContext } from '../../../../utils/context';
import { editReservation, deleteReservationAPI } from '../../../../utils/axios';

const Reservation = ({
  reservation,
  status,
  reservationsList,
  setReservationsList,
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
    // const userIndex = invited.find((guestId) => {
    //   console.log(guestId, user.id, guestId * 1 === user.id * 1);
    //   return guestId * 1 === user.id * 1;
    // });

    const updatedInvited = invited.filter(
      (guestId) => guestId + '' !== user.id + ''
    );

    console.log(updatedInvited);

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
    console.log(reservation);
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
      id,
      open,
      from: from._i,
      to: to._i,
      invited,
    };

    tempReservationsList.splice(reservationToEditIndex, 1, updatedReservation);

    setReservationsList(tempReservationsList);
    editReservation(updatedReservation.id, updatedReservation);
  };

  const getUserNameById = (id) => {
    if (id + '' === user.id + '') return 'אתה';
    return usersList[0].find((user) => {
      return user.id + '' === id + '';
    }).name_he;
  };

  if (!reservation) return <></>;

  const { onedByUser, open, userIsInvaited } = status;

  const { owner, invited } = reservation;
  const ownerName = getUserNameById(owner);
  const invtedNames = invited.map((user) => getUserNameById(user)).join(', ');

  return (
    <div
      className="reservation"
      onClick={(e) => {
        console.log(status);
      }}
    >
      <p className="owner">מזמין: {ownerName}</p>
      {invtedNames && <p>מצטרפים: {invtedNames}</p>}
      {onedByUser && (
        <div
          className="btn cancel-owne"
          onClick={(e) => onReservationCancelation(e, reservation)}
        >
          בטל הזמנה
        </div>
      )}
      {userIsInvaited && (
        <div
          className="btn cancel-join"
          onClick={(e) => {
            onInvitationCancelation(e, reservation.id);
          }}
        >
          בטל השתתפות
        </div>
      )}
      {!onedByUser && open && !userIsInvaited && (
        <div
          className="btn join"
          onClick={(e) => {
            onInvitationAcception(e, reservation.id);
          }}
        >
          הצטרף
        </div>
      )}
      {!onedByUser && !open && <p className="close-massege">הזמנה סגורה</p>}
    </div>
  );
};

export default Reservation;
