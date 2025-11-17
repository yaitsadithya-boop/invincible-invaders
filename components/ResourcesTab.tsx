import React from 'react';
import type { Resources, Resource } from '../types';
import { Card } from './common/Card';
import { Icon, YouTubeIcon } from './common/Icon';

interface ResourcesTabProps {
  resources: Resources;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ resources }) => {
  const skills = Object.keys(resources);

  const content = skills.length === 0 ? (
    <div className="text-center text-light-text-secondary dark:text-dark-text-secondary py-10">
      <p>No skill gaps were identified, so no specific resources are needed. Keep up the great work!</p>
    </div>
  ) : (
    <div>
      <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Curated Learning Resources</h3>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
        For each missing skill, here are tailored resources to help you learn, practice, and build.
      </p>
      <div className="space-y-6">
        {skills.map(skill => {
          const resource = resources[skill] || {};
          const practiceQuestions = (resource as Partial<Resource>).practiceQuestions || [];
          const projectIdeas = (resource as Partial<Resource>).projectIdeas || [];
          const learningResources = (resource as Partial<Resource>).learningResources || [];
          const youtubeRecommendations = (resource as Partial<Resource>).youtubeRecommendations || [];

          return (
            <details key={skill} className="bg-light-bg/80 dark:bg-dark-bg/80 border border-light-border dark:border-dark-border rounded-lg group" open>
              <summary className="p-4 cursor-pointer text-lg font-semibold text-light-brand dark:text-dark-brand flex justify-between items-center">
                {skill}
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
              <div className="p-6 border-t border-light-border dark:border-dark-border grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Practice Questions</h4>
                  <ul className="space-y-2">
                    {practiceQuestions.length > 0 ? practiceQuestions.map((q, i) => (
                      <li key={i} className="flex items-start">
                        <Icon platform={q.platform} className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                        <a href={q.link} target="_blank" rel="noopener noreferrer" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-brand dark:hover:text-dark-brand transition-colors">{q.text}</a>
                      </li>
                    )) : <li className="text-gray-500">No questions found.</li>}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Project Ideas</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {projectIdeas.length > 0 ? projectIdeas.map((p, i) => (
                      <li key={i} className="text-light-text-secondary dark:text-dark-text-secondary">
                        {typeof p === 'string' ? p : (p && typeof p === 'object' && 'text' in p) ? (p as any).text : null}
                      </li>
                    )) : <li className="text-gray-500 list-none">No project ideas found.</li>}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Recommended Websites</h4>
                   <ul className="space-y-2">
                    {learningResources.length > 0 ? learningResources.map((r, i) => (
                      <li key={i} className="flex items-start">
                         <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                         <a href={r.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-light-text-secondary dark:text-dark-text-secondary hover:text-light-brand dark:hover:text-dark-brand transition-colors">{r.title}</a>
                      </li>
                    )) : <li className="text-gray-500">No learning resources found.</li>}
                  </ul>
                </div>

                {youtubeRecommendations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">YouTube Playlists</h4>
                    <ul className="space-y-2">
                      {youtubeRecommendations.map((yt, i) => (
                        <li key={i} className="flex items-start">
                          <YouTubeIcon className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-red-600" />
                          <div>
                            <a href={yt.playlistLink} target="_blank" rel="noopener noreferrer" className="font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-brand dark:hover:text-dark-brand transition-colors">{yt.playlistName}</a>
                            <p className="text-sm text-gray-500">{yt.channelName}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm p-6 md:p-8">
        {content}
    </div>
  );
};

export default ResourcesTab;
