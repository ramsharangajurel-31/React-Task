// src/components/JobDetails/JobDetails.jsx
import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

const JobDetails = ({ job, onClose, onApply }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="text-5xl mr-4">
            {job.title.toLowerCase().includes('frontend') || job.title.toLowerCase().includes('developer') ? '💻' :
             job.title.toLowerCase().includes('backend') ? '⚙️' :
             job.title.toLowerCase().includes('designer') || job.title.toLowerCase().includes('ui/ux') ? '🎨' : '🏢'}
          </div>
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-1">{job.title}</h2>
            <p className="text-xl text-gray-600 flex items-center">
              <span className="mr-2">🏢</span>{job.company}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            <span className="mr-2">📍</span>{job.location}
          </span>
          <span className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            job.type.toLowerCase() === 'full-time' ? 'bg-green-100 text-green-800' :
            job.type.toLowerCase() === 'remote' ? 'bg-blue-100 text-blue-800' :
            job.type.toLowerCase() === 'internship' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <span className="mr-2">⏰</span>{job.type}
          </span>
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
            className="flex-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            ✅ Apply Now
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
  onApply: PropTypes.func.isRequired
};

export default JobDetails;
