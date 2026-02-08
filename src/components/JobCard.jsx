// src/components/JobCard/JobCard.jsx
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const JobCard = ({ job, onViewDetails }) => {
  const getJobIcon = (title) => {
    if (title.toLowerCase().includes('frontend') || title.toLowerCase().includes('developer')) return '💻';
    if (title.toLowerCase().includes('backend')) return '⚙️';
    if (title.toLowerCase().includes('designer') || title.toLowerCase().includes('ui/ux')) return '🎨';
    return '🏢';
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'remote': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="job-card bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{getJobIcon(job.title)}</div>
        <div>
          <h3 className="font-bold text-xl text-gray-800 mb-1">{job.title}</h3>
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">🏢</span>{job.company}
          </p>
        </div>
      </div>
      <p className="text-gray-500 mb-3 flex items-center">
        <span className="mr-2">📍</span>{job.location}
      </p>
      <span className={`inline-block ${getTypeColor(job.type)} text-sm px-3 py-1 rounded-full font-semibold mb-4`}>
        {job.type}
      </span>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>
      <Button onClick={() => onViewDetails(job)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
        View Details
      </Button>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default JobCard;
