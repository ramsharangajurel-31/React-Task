import { FaBriefcase, FaUserCircle } from "react-icons/fa";
import { BsBookmark, BsClipboardCheck } from "react-icons/bs";

export default function Header() {
  return (
    <header className="top-header">
      <div className="header-left">
        <div className="logo-box">
          <FaBriefcase />
        </div>

        <div className="logo-text">
          <h3>JobBoard Pro</h3>
          <span>Find your dream career</span>
        </div>
      </div>

      <div className="header-right">
        <FaUserCircle />
        <span>Profile</span>
      </div>
    </header>
  );
}
