import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    close();
    onLogout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={close}>
          Edu<span>Portal</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
          <li><NavLink to="/courses" onClick={close}>Courses</NavLink></li>
          {user ? (
            <>
              <li><NavLink to="/dashboard" onClick={close}>Dashboard</NavLink></li>
              <li>
                <button type="button" className="btn btn-small btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" onClick={close}>Login</NavLink></li>
              <li><NavLink to="/register" className="btn btn-small" onClick={close}>Register</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
