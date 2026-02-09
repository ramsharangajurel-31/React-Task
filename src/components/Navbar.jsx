import { FaBriefcase } from "react-icons/fa";
import { BsBookmark, BsClipboardCheck } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="nav-tabs">
      <button className="active">
        <FaBriefcase /> All Jobs
      </button>

      <button>
        <BsBookmark /> Saved (0)
      </button>

      <button>
        <BsClipboardCheck /> Applied (0)
      </button>
    </nav>
  );
}
