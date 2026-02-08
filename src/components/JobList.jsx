import JobCard from "./JobCard";

export default function JobList({ jobs, onSelect }) {
  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onSelect={onSelect} />
      ))}
    </div>
  );
}
