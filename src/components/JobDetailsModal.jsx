// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

export default function JobDetailsModal({ job, onClose, onApply }) {
  return (
    <AnimatePresence>
      {job && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="job-modal"
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="header-left">
                <img src={job.logo} alt={job.company} />
                <div>
                  <h2>{job.title}</h2>
                  <p>{job.company}</p>
                </div>
              </div>

              <button className="close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {/* Meta */}
            <div className="modal-meta">
              <span><FiMapPin /> {job.location}</span>
              <span><FiBriefcase /> {job.type}</span>
              <span><HiOutlineCurrencyDollar /> {job.salary}</span>
              <span><FiClock /> 1w ago</span>
              <span>{job.applicants} Applicants</span>
            </div>

            {/* Description */}
            <section>
              <h3>Job Description</h3>
              <p>
                6-month contract position to help scale our infrastructure.
                Work with modern DevOps tools and best practices in a fast-paced environment.
              </p>
            </section>

            {/* Requirements */}
            <section>
              <h3>Requirements</h3>
              <ul>
                <li><FaCheckCircle /> 5+ years of DevOps experience</li>
                <li><FaCheckCircle /> Kubernetes & Docker expertise</li>
                <li><FaCheckCircle /> Strong CI/CD pipelines</li>
                <li><FaCheckCircle /> Infrastructure as Code (Terraform)</li>
                <li><FaCheckCircle /> Monitoring & logging experience</li>
              </ul>
            </section>

            {/* Benefits */}
            <section>
              <h3>Benefits</h3>
              <ul>
                <li><FaCheckCircle /> Competitive contract rate</li>
                <li><FaCheckCircle /> Fully remote</li>
                <li><FaCheckCircle /> Flexible working hours</li>
                <li><FaCheckCircle /> Full-time conversion potential</li>
                <li><FaCheckCircle /> Modern tech stack</li>
              </ul>
            </section>

            {/* Skills */}
            <section>
              <h3>Required Skills</h3>
              <div className="skills">
                {job.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </section>

            {/* Actions */}
            <div className="modal-actions">
              <button className="apply" onClick={() => onApply(job)}>Apply Now</button>
              <button className="secondary" onClick={onClose}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
