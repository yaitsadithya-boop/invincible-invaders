import React, { useEffect, useState } from 'react';

interface LoadingStepProps {
  messages: string[];
}

const LoadingStep: React.FC<LoadingStepProps> = ({ messages }) => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl p-8 border border-light-border dark:border-dark-border text-center">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
        Building Your Career Plan{dots}
      </h2>
      <div className="space-y-3 text-left">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center text-light-text-secondary dark:text-dark-text-secondary animate-fade-in" style={{ animationDelay: `${index * 200}ms`}}>
            <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingStep;