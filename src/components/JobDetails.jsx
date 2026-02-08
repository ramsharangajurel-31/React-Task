export default function JobDetails({ job, onClose, onApply }) {
  if (!job) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{job.title}</h2>
        <p className="company">{job.company}</p>
        <p className="meta">
          {job.location} • {job.type}
        </p>

        <p className="desc">{job.description}</p>

        <h4>Requirements</h4>
        <ul>
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <div className="actions">
          <button className="btn secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn primary" onClick={onApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
