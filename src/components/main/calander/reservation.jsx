import { useGlobalContext } from '../../../utils/context';

const Reservation = ({ reservation }) => {
  const { user, usersList } = useGlobalContext();

  const getUserManeById = (id) => {
    if (id == user.id) return 'אתה';
    return usersList[0].find((user) => {
      return user.id == id;
    }).name_he;
  };

  if (!reservation) return <></>;

  const { owner, open, invited } = reservation;

  const ownerName = getUserManeById(owner);

  const invtedNames = invited.map((user) => getUserManeById(user)).join(', ');

  console.log(invtedNames);
  return (
    <div className="reservation" onClick={() => console.log(reservation, user)}>
      <p className="owner">מזמין: {ownerName}</p>
      {invtedNames && <p>מצטרפים: {invtedNames}</p>}
    </div>
  );
};

export default Reservation;

// invited
// open
// owner
