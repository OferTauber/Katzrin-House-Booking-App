import { useGlobalContext } from '../../../utils/context';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useGlobalContext();
  return (
    <nav>
      <div className="nav-name">
        <p>שלום {user.name}</p>
      </div>
      <div className="nav-buttons">
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
