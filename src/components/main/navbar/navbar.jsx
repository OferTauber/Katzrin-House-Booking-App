import { useGlobalContext } from '../../../utils/context';
import './navbar.css';
import { Route, Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useGlobalContext();
  return (
    <nav>
      <div className="upper-nav">
        <p>שלום {user.name}</p>
        <img
          src={user.picture}
          alt="UserPic"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
      </div>
      <div className="lower-sticky-nav">
        <Link to="/" className="btn">
          לוח שנה
        </Link>
        <Link to="/info" className="btn">
          מידע
        </Link>
        <Link to="/blog" className="btn">
          טיולים באזור
        </Link>
      </div>
    </nav>
  );
}
