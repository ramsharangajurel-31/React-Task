// src/components/JobList/JobList.jsx
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { jobs, sponsors } from "./data/jobs";

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentSponsor, setCurrentSponsor] = useState(0);
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [salaryRange, setSalaryRange] = useState([20000, 70000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showApplied, setShowApplied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = jobTypeFilter === "All" || job.type === jobTypeFilter;
      const matchesLocation = locationFilter === "All" || job.location === locationFilter;
      const matchesExperience = experienceFilter === "All" || job.experience === experienceFilter;
      const matchesSalary = job.salary.min >= salaryRange[0] && job.salary.max <= salaryRange[1];

      return matchesSearch && matchesType && matchesLocation && matchesExperience && matchesSalary;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "salary-high":
          return b.salary.max - a.salary.max;
        case "salary-low":
          return a.salary.min - b.salary.min;
        case "rating":
          return b.rating - a.rating;
        case "company":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [searchTerm, jobTypeFilter, locationFilter, experienceFilter, salaryRange, sortBy]);

  const handleApply = (jobId) => {
    setAppliedJobs(prev => [...prev, jobId]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = (jobId) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
            🚀 JobBoard Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">Find your dream job in Nepal's top companies</p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="🔍 Search jobs, companies, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-3xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 text-lg outline-none transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="text-2xl">🔍</span>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Locations</option>
                  <option value="Kathmandu, Nepal">Kathmandu</option>
                  <option value="Pokhara, Nepal">Pokhara</option>
                  <option value="Bhaktapur, Nepal">Bhaktapur</option>
                  <option value="Lalitpur, Nepal">Lalitpur</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="rating">Rating</option>
                  <option value="company">Company</option>
                </select>
              </div>
            </div>

            {/* Salary Range Slider */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="20000"
                max="70000"
                step="5000"
                value={salaryRange[0]}
                onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="20000"
                max="70000"
                step="5000"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  showSaved
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💾 Saved Jobs ({savedJobs.length})
              </button>
              <button
                onClick={() => setShowApplied(!showApplied)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  showApplied
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✅ Applied Jobs ({appliedJobs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Sponsor Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🏆 Proudly Sponsored By</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-4 animate-bounce">{sponsors[currentSponsor].logo}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{sponsors[currentSponsor].name}</h3>
            <p className="text-gray-600">{sponsors[currentSponsor].description}</p>
          </div>
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-2">💼</div>
            <div className="text-3xl font-bold text-blue-600">{filteredJobs.length}</div>
            <div className="text-gray-600">Available Jobs</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-green-600">{new Set(filteredJobs.map(job => job.company)).size}</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-2">📍</div>
            <div className="text-3xl font-bold text-purple-600">{new Set(filteredJobs.map(job => job.location)).size}</div>
            <div className="text-gray-600">Locations</div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredJobs.map((job, index) => (
            <div key={job.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard
                job={job}
                onViewDetails={setSelectedJob}
                onSave={handleSave}
                savedJobs={savedJobs}
              />
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <JobDetails
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onApply={(jobId) => handleApply(jobId)}
            appliedJobs={appliedJobs}
          />
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in z-50 flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <span className="font-semibold">Application submitted successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
