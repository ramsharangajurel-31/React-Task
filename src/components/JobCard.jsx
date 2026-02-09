
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiBookmark,
} from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="left">
        <img src={job.logo} alt={job.company} className="avatar" />

        <div className="info">
          <h3>{job.title}</h3>

          <div className="company">
            {job.company}
            <span className="rating">
              <FaStar /> 4.9
            </span>
          </div>

          <div className="meta">
            <span>
              <FiMapPin /> {job.location}
            </span>
            <span>
              <FiBriefcase /> {job.type}
            </span>
            <span className="salary">
              <HiOutlineCurrencyDollar /> {job.salary}
            </span>
            <span>
              <FiClock /> 1w ago
            </span>
          </div>

          <div className="skills">
            {job.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="right">
        <button className="bookmark">
          <FiBookmark />
        </button>
        <span className="applicants">{job.applicants} applicants</span>
      </div>
    </div>
  );
}
