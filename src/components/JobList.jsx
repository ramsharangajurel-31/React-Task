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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
  }, [searchTerm]);

  const handleApply = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="🔍 Search jobs, companies, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-3xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 text-lg outline-none transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="text-2xl">🔍</span>
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
              <JobCard job={job} onViewDetails={setSelectedJob} />
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
            onApply={handleApply}
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
