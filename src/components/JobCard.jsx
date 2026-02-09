import { FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-left">
        <img src={job.logo} alt="" />

        <div>
          <h4>{job.title}</h4>
          <p>{job.company}</p>

          <div className="meta">
            <span><FaMapMarkerAlt /> {job.location}</span>
            <span><FaClock /> {job.type}</span>
            <span>{job.salary}</span>
          </div>

          <div className="tags">
            {job.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="job-right">
        <FaUsers /> {job.applicants}
      </div>
    </div>
  );
}
