// src/components/JobCard/JobCard.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "./Button";

const JobCard = ({ job, onViewDetails, onSave, savedJobs }) => {
  const [isSaved, setIsSaved] = useState(savedJobs.includes(job.id));

  const getJobIcon = (title) => {
    if (title.toLowerCase().includes('frontend') || title.toLowerCase().includes('developer')) return '💻';
    if (title.toLowerCase().includes('backend')) return '⚙️';
    if (title.toLowerCase().includes('designer') || title.toLowerCase().includes('ui/ux')) return '🎨';
    if (title.toLowerCase().includes('data') || title.toLowerCase().includes('analyst')) return '📊';
    return '🏢';
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-emerald-100 text-emerald-800';
      case 'remote': return 'bg-indigo-100 text-indigo-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-amber-100 text-amber-800';
      case 'internship': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(job.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="job-card bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 relative">
      <button
        onClick={handleSave}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
          isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {isSaved ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{getJobIcon(job.title)}</div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600 flex items-center mb-2">
            <span className="mr-2">🏢</span>{job.company}
          </p>
          <div className="flex items-center mb-2">
            {renderStars(job.rating)}
            <span className="ml-2 text-sm text-gray-600">({job.rating})</span>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-3 flex items-center">
        <span className="mr-2">📍</span>{job.location}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className={`inline-block ${getTypeColor(job.type)} text-sm px-3 py-1 rounded-full font-semibold`}>
          {job.type}
        </span>
        <span className="text-sm text-gray-600">{job.experience}</span>
      </div>

      <p className="text-emerald-600 font-semibold mb-3">
        💰 ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
      </p>

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

      <Button onClick={() => onViewDetails(job)} className="w-full">
        View Details
      </Button>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  savedJobs: PropTypes.array.isRequired
};

export default JobCard;
