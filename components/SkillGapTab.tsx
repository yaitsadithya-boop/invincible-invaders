import React from 'react';
import type { SkillGapAnalysis } from '../types';
import { Card } from './common/Card';

interface SkillGapTabProps {
  skillGaps: SkillGapAnalysis;
}

const SkillList: React.FC<{ title: string, skills: string[] }> = ({ title, skills }) => (
    <Card title={title}>
      {skills && skills.length > 0 ? (
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <span className="text-light-text-secondary dark:text-dark-text-secondary">{skill}</span>
            </li>
          ))}
        </ul>
      ) : (
         <div className="flex items-center text-green-500">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <p>No gaps identified! Great job.</p>
        </div>
      )}
    </Card>
);

const SkillGapTab: React.FC<SkillGapTabProps> = ({ skillGaps }) => {
  return (
    <div className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm p-6 md:p-8">
        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Identified Skill Gaps</h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Here are the key skills we identified as missing from your resume based on your target role. Focus on these areas to become a stronger candidate.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <SkillList title="Core Technical Skills" skills={skillGaps.missingCoreSkills} />
          <SkillList title="Most Demanding Skills (2025)" skills={skillGaps.missingDemandingSkills} />
        </div>
    </div>
  );
};

export default SkillGapTab;
