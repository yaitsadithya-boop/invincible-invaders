
import React, { useState } from 'react';
import type { PersonalizedRoadmap } from '../types';

interface RoadmapTabProps {
  roadmap: PersonalizedRoadmap;
}

const RoadmapTab: React.FC<RoadmapTabProps> = ({ roadmap }) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const renderTaskWithLinks = (task: string) => {
    const parts = task.split(/(\[[^\]]+\]\([^)]+\))/g);
    return (
      <>
        {parts.map((part, index) => {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const [, text, url] = match;
            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-brand dark:text-dark-brand font-medium hover:underline"
                onClick={(e) => e.stopPropagation()} // Prevent label click from toggling checkbox
              >
                {text}
              </a>
            );
          }
          return part;
        })}
      </>
    );
  };

  const renderTaskContent = (task: string | { task: string; link?: string }) => {
    if (typeof task === 'string') {
      return renderTaskWithLinks(task);
    }

    if (task.link) {
      return (
        <>
          {task.task}{' '}
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-brand dark:text-dark-brand font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            [Resource Link]
          </a>
        </>
      );
    }
    return task.task;
  };

  const content = (!roadmap || !roadmap.roadmap || roadmap.roadmap.length === 0) ? (
    <div className="text-center text-light-text-secondary dark:text-dark-text-secondary py-10">
      <p>Your skills are well-aligned with your target role. No specific roadmap was generated.</p>
      <p>Consider exploring advanced topics or contributing to open-source projects to stand out further.</p>
    </div>
  ) : (
    <div>
      <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Your 4-Week Personalized Roadmap</h3>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
        Follow this structured plan to systematically fill your skill gaps and prepare for interviews. Consistency is key!
      </p>
      <div className="space-y-8">
        {roadmap.roadmap.map(week => (
          <div key={week.week} className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg border border-light-border dark:border-dark-border">
            <h4 className="text-xl font-bold text-light-brand dark:text-dark-brand mb-1">Week {week.week}: <span className="text-light-text-primary dark:text-dark-text-primary font-semibold">{week.focus}</span></h4>
            <div className="mt-4 space-y-4">
              {(week.dailyPlan || []).map(dayPlan => (
                <div key={dayPlan.day}>
                  <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{dayPlan.day}</h5>
                  <ul className="mt-2 ml-1 space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                    {(dayPlan.tasks || []).map((task, i) => {
                      const taskId = `${week.week}-${dayPlan.day}-${i}`;
                      const isCompleted = completedTasks[taskId];
                      return (
                         <li key={i} className={`flex items-start p-2 rounded-lg transition-all duration-300 ${isCompleted ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50' : ''}`}>
                           <input
                              type="checkbox"
                              id={taskId}
                              checked={isCompleted}
                              onChange={() => handleToggleTask(taskId)}
                              className="mr-3 mt-1 h-5 w-5 rounded border-gray-400 dark:border-gray-600 text-green-600 focus:ring-green-500 shrink-0 accent-green-600 bg-light-surface dark:bg-dark-surface"
                            />
                           <label htmlFor={taskId} className={`flex-grow cursor-pointer ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                             {renderTaskContent(task)}
                           </label>
                           {isCompleted && (
                                <span className="ml-4 text-xs font-bold text-green-700 bg-green-200 dark:text-green-200 dark:bg-green-700/50 px-2 py-0.5 rounded-full self-center">
                                    DONE
                                </span>
                            )}
                         </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm p-6 md:p-8">
        {content}
    </div>
  );
};

export default RoadmapTab;
