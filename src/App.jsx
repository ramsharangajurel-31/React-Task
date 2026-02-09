import { useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import jobsData from "../src/components/data/jobs";

export default function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);

  const jobsPerPage = 5;

  const filteredJobs = jobsData.filter((job) => {
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

          <div className="jobs">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            current={page}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}
