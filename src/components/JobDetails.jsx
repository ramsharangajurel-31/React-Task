// src/components/JobDetails/JobDetails.jsx
import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

const JobDetails = ({ job, onClose, onApply, appliedJobs }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const isApplied = appliedJobs.includes(job.id);

  return (
    <Modal onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="text-5xl mr-4">
            {job.title.toLowerCase().includes('frontend') || job.title.toLowerCase().includes('developer') ? '💻' :
             job.title.toLowerCase().includes('backend') ? '⚙️' :
             job.title.toLowerCase().includes('designer') || job.title.toLowerCase().includes('ui/ux') ? '🎨' :
             job.title.toLowerCase().includes('data') || job.title.toLowerCase().includes('analyst') ? '📊' : '🏢'}
          </div>
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-1">{job.title}</h2>
            <p className="text-xl text-gray-600 flex items-center mb-2">
              <span className="mr-2">🏢</span>{job.company}
            </p>
            <div className="flex items-center mb-2">
              {renderStars(job.rating)}
              <span className="ml-2 text-gray-600">({job.rating})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            <span className="mr-2">📍</span>{job.location}
          </span>
          <span className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            job.type.toLowerCase() === 'full-time' ? 'bg-emerald-100 text-emerald-800' :
            job.type.toLowerCase() === 'remote' ? 'bg-indigo-100 text-indigo-800' :
            job.type.toLowerCase() === 'part-time' ? 'bg-purple-100 text-purple-800' :
            job.type.toLowerCase() === 'contract' ? 'bg-amber-100 text-amber-800' :
            job.type.toLowerCase() === 'internship' ? 'bg-pink-100 text-pink-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <span className="mr-2">⏰</span>{job.type}
          </span>
          <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            <span className="mr-2">🎓</span>{job.experience}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">💰 Salary Range</h3>
          <p className="text-emerald-600 font-bold text-lg">
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} per year
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">📋 Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🛠️ Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span key={idx} className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              onApply();
              onClose();
            }}
            className={`flex-1 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 ${
              isApplied
                ? 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700'
                : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
            }`}
            disabled={isApplied}
          >
            {isApplied ? '✅ Already Applied' : '✅ Apply Now'}
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            ❌ Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  appliedJobs: PropTypes.array.isRequired
};

export default JobDetails;
