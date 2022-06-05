import { useGlobalContext } from '../../../utils/context';

const Reservation = ({ reservation }) => {
  const { user } = useGlobalContext();

  if (!reservation) return <></>;

  return (
    <div className="reservation" onClick={() => console.log(reservation, user)}>
      הזמנה!
    </div>
  );
};

export default Reservation;

// invited
// open
// owner
