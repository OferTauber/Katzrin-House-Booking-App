export default function reservationType(reservation, currentUser) {
  if (!reservation) return;

  const type = {
    onedByUser: false,
    open: false,
    userIsInvaited: false,
  };

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
