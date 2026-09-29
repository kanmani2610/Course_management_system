import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">EP</span>
        Edu<span>Portal</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={linkClass}>
          <span className="sidebar-icon">🏠</span> Dashboard
        </NavLink>
        <NavLink to="/courses" className={linkClass}>
          <span className="sidebar-icon">📚</span> Courses
        </NavLink>
        <NavLink to="/" className={linkClass}>
          <span className="sidebar-icon">🏡</span> Home
        </NavLink>
      </nav>
      <div className="sidebar-help">
        <div className="sidebar-help-icon">💬</div>
        <h4>Need help?</h4>
        <p>Facing an issue while using EduPortal?</p>
      </div>
      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}