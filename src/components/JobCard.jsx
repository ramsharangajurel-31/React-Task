export default function JobCard({ job, onSelect }) {
  return (
    <div className="job-card" onClick={() => onSelect(job)}>
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="meta">
        {job.location} • {job.type}
      </p>
    </div>
  );
}
