import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Filters({ setType, setLocation }) {
  return (
    <aside className="filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <FaClock />
        <label>Job Type</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option>All</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>
      </div>

      <div className="filter-group">
        <FaMapMarkerAlt />
        <label>Location</label>
        <select onChange={(e) => setLocation(e.target.value)}>
          <option>All</option>
          <option>Remote</option>
          <option>San Francisco</option>
          <option>New York</option>
          <option>Boston</option>
          <option>Seattle</option>
        </select>
      </div>
    </aside>
  );
}
