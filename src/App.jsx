import { useState } from "react";
import { jobsData } from "./components/data/jobs";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

import "./style/style.css";

export default function App() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleApply = () => {
    setSuccess(true);
    setSelectedJob(null);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="app">
      <h1 className="title">Job Portal</h1>

      {success && (
        <div className="success">Application Submitted Successfully!</div>
      )}

      <JobList jobs={jobsData} onSelect={setSelectedJob} />

      <JobDetails
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApply}
      />
    </div>
  );
}
