export default function reservationType(reservation, currentUser) {
  const type = {
    onedByUser: false,
    open: false,
    userIsInvaited: false,
    dateIsFree: true,
  };

  if (!reservation) return type;

  type.dateIsFree = false;

  if (reservation.owner + '' === currentUser.id + '') type.onedByUser = true;
  if (
    reservation.invited &&
    (reservation.invited.includes(currentUser.id * 1) ||
      reservation.invited.includes(currentUser.id + ''))
  )
    type.userIsInvaited = true;

  if (reservation.open) type.open = true;

  return type;
}
