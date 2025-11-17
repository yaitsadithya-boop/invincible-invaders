import React, { useState } from 'react';
import { TARGET_ROLES } from '../constants';

interface UploadStepProps {
  onAnalyze: (resumeText: string, targetRole: string) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onAnalyze }) => {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text.');
      return;
    }
    if (!targetRole) {
      setError('Please select a target role.');
      return;
    }
    setError('');
    onAnalyze(resumeText, targetRole);
  };

  return (
    <div className="max-w-3xl mx-auto bg-light-surface/20 dark:bg-dark-surface/20 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-light-border/50 dark:border-dark-border/50">
      <div className="space-y-6">
        <div>
          <label htmlFor="resume-text" className="block text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Paste Your Resume
          </label>
          <textarea
            id="resume-text"
            rows={15}
            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md p-4 text-light-text-secondary dark:text-dark-text-secondary focus:ring-2 focus:ring-light-brand dark:focus:ring-dark-brand focus:border-light-brand dark:focus:border-dark-brand transition-shadow placeholder-gray-500"
            placeholder="Paste the full text of your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="target-role" className="block text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Select Your Target Role
          </label>
          <select
            id="target-role"
            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md p-4 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-brand dark:focus:ring-dark-brand focus:border-light-brand dark:focus:border-dark-brand transition-shadow"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            {TARGET_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-extrabold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!resumeText.trim() || !targetRole}
          >
            Analyze My Career Path
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;