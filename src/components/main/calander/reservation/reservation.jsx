import { useGlobalContext } from '../../../../utils/context';
import { editReservation } from '../../../../utils/axios';

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

    const guestList = tempReservationsList[reservationToCancleIndex].invited;
    const userInvitationIdex = guestList.find((guestId) => {
      return guestId + '' === user.id + '';
    });

    guestList.splice(userInvitationIdex, 1);

    setReservationsList(tempReservationsList);
    editReservation(reservationId, tempReservationsList[userInvitationIdex]);
  };

  const onInvitationAcception = (event, reservationId) => {
    event.stopPropagation();
    const tempReservationsList = [...reservationsList];
    const reservationToJoinIndex = tempReservationsList.findIndex(
      (reservation) => reservation.id + '' === reservationId + ''
    );
    tempReservationsList[reservationToJoinIndex].invited.push(user.id);

    setReservationsList(tempReservationsList);
    editReservation(
      reservationId,
      tempReservationsList[reservationToJoinIndex]
    );
  };

  const getUserManeById = (id) => {
    if (id + '' === user.id + '') return 'אתה';
    return usersList[0].find((user) => {
      return user.id + '' === id + '';
    }).name_he;
  };

  if (!reservation) return <></>;

  const { onedByUser, open, userIsInvaited } = status;

  const { owner, invited } = reservation;
  const ownerName = getUserManeById(owner);
  const invtedNames = invited.map((user) => getUserManeById(user)).join(', ');

  return (
    <div
      className="reservation"
      onClick={(e) => {
        console.log(status);
      }}
    >
      <p className="owner">מזמין: {ownerName}</p>
      {invtedNames && <p>מצטרפים: {invtedNames}</p>}
      {onedByUser && <div className="btn cancel-owne">בטל הזמנה</div>}
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
