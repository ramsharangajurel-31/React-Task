import { FaUserCircle, FaBriefcase } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <FaBriefcase />
        <div>
          <strong>JobBoard Pro</strong>
          <small>Find your dream career</small>
        </div>
      </div>

      <FaUserCircle size={28} className="profile-icon" />
    </header>
  );
}
