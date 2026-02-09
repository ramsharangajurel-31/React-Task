import { FaBriefcase } from "react-icons/fa";
import { BsBookmark, BsClipboardCheck } from "react-icons/bs";

export default function Navbar({ activeTab, setActiveTab, savedCount, appliedCount }) {
  return (
    <nav className="nav-tabs">
      <button
        className={activeTab === "all" ? "active" : ""}
        onClick={() => setActiveTab("all")}
      >
        <FaBriefcase /> All Jobs
      </button>

      <button
        className={activeTab === "saved" ? "active" : ""}
        onClick={() => setActiveTab("saved")}
      >
        <BsBookmark /> Saved ({savedCount})
      </button>

      <button
        className={activeTab === "applied" ? "active" : ""}
        onClick={() => setActiveTab("applied")}
      >
        <BsClipboardCheck /> Applied ({appliedCount})
      </button>
    </nav>
  );
}
