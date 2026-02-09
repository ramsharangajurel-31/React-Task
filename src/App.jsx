import { useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import jobsData from "../src/components/data/jobs";
import Navbar from "./components/Navbar";
import JobDetailsModal from "./components/JobDetailsModal";

export default function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  const jobsPerPage = 5;

  // Toggle Save Job
  const toggleSave = (job) => {
    setSavedJobs((prev) =>
      prev.some((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job]
    );
  };

  // Open Modal
  const openModal = (job) => {
    setSelectedJob(job);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedJob(null);
  };

  // Apply for Job
  const applyForJob = (job) => {
    if (!appliedJobs.some((j) => j.id === job.id)) {
      setAppliedJobs((prev) => [...prev, job]);
    }
    setSelectedJob(null); // Close modal after applying
  };

  // Decide which jobs to show
  const jobsSource = activeTab === "saved" ? savedJobs : activeTab === "applied" ? appliedJobs : jobsData;

  // Apply filters
  const filteredJobs = jobsSource.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All" || job.type === type) &&
      (location === "All" || job.location === location)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const start = (page - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(start, start + jobsPerPage);

  return (
    <div className="app">
      <Header />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobs.length}
        appliedCount={appliedJobs.length}
      />

      <div className="layout">
        <Filters setType={setType} setLocation={setLocation} />

        <main className="content">
          <input
            className="search"
            type="text"
            placeholder="Search jobs, skills, companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <p className="count">{filteredJobs.length} jobs found</p>

          {activeTab === "saved" && filteredJobs.length === 0 && (
            <p className="empty">No saved jobs yet.</p>
          )}

          <div className="jobs">
            {currentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.some((j) => j.id === job.id)}
                onToggleSave={toggleSave}
                onOpenModal={openModal}
              />
            ))}
          </div>

          {filteredJobs.length > jobsPerPage && (
            <Pagination
              totalPages={totalPages}
              current={page}
              setPage={setPage}
            />
          )}
        </main>
      </div>

      <JobDetailsModal job={selectedJob} onClose={closeModal} onApply={applyForJob} />
    </div>
  );
}
