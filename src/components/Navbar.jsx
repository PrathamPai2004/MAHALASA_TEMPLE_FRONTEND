import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/">Mahalasa Home</Link>
        <Link to='/contacts'>Contacts</Link>
        <Link to="/dorm-booking">Dormitory Booking</Link>
        <Link to="/sevas">Sevas</Link>
        <Link to="/media">Media</Link>
        <Link to='/admin'>Admin</Link>
      </div>
    </>
  );
}

export default Navbar;
