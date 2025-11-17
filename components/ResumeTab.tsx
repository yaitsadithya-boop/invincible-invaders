
import React, { useState } from 'react';
import type { ResumeAnalysis, RewrittenResume } from '../types';
import { Card } from './common/Card';

interface ResumeTabProps {
  resumeAnalysis: ResumeAnalysis;
  rewrittenResume: RewrittenResume;
}

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 85 ? 'text-green-400' : score > 60 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="relative w-48 h-48">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                <circle className="text-light-border dark:text-dark-border" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                <circle
                    className={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${color}`}>
                {score}
            </span>
        </div>
    );
};

const ResumeTab: React.FC<ResumeTabProps> = ({ resumeAnalysis, rewrittenResume }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenResume.rewrittenText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const renderExample = (exampleText: string) => {
    if (!exampleText || !exampleText.includes('After:')) {
        return <p className="text-sm text-gray-500 italic">Example: "{exampleText}"</p>;
    }
    const parts = exampleText.split('After:');
    const before = parts[0].replace('Before:', '').trim();
    const after = parts[1].trim();

    return (
        <div className="text-sm mt-3 p-3 bg-light-surface dark:bg-dark-surface border-l-4 border-light-border dark:border-dark-border rounded-r-md">
            <p className="text-gray-500"><strong className="font-semibold text-light-text-secondary dark:text-dark-text-secondary">Before:</strong> <span className="italic">{before}</span></p>
            <p className="text-green-600 dark:text-green-400 mt-1"><strong className="font-semibold">After:</strong> <span className="italic font-medium">{after}</span></p>
        </div>
    );
  };


  return (
    <div className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm p-6 md:p-8">
        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">Resume Review & Enhancement</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg p-6 rounded-lg border border-light-border dark:border-dark-border">
                  <h4 className="text-lg font-semibold mb-4 text-light-text-secondary dark:text-dark-text-secondary">Initial ATS Score</h4>
                  <ScoreGauge score={resumeAnalysis.atsScore} />
            </div>
              <Card title="Score Breakdown" className="lg:col-span-2">
                  <div className="space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                      <p><strong>Clarity:</strong> {resumeAnalysis.scoreBreakdown.clarity}</p>
                      <p><strong>Impact:</strong> {resumeAnalysis.scoreBreakdown.impact}</p>
                      <div>
                        <p><strong>ATS Friendliness:</strong> {resumeAnalysis.scoreBreakdown.ats_friendliness.summary}</p>
                        <p className="mt-2 text-sm italic text-light-text-secondary/80 dark:text-dark-text-secondary/80">
                            <strong className="font-semibold not-italic text-light-text-secondary dark:text-dark-text-secondary">Formatting Check:</strong> {resumeAnalysis.scoreBreakdown.ats_friendliness.formattingSummary}
                        </p>
                        {resumeAnalysis.scoreBreakdown.ats_friendliness.missingKeywords && resumeAnalysis.scoreBreakdown.ats_friendliness.missingKeywords.length > 0 && (
                            <div className="mt-4">
                                <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Missing Keywords & Integration Tips:</h5>
                                <ul className="space-y-3">
                                    {resumeAnalysis.scoreBreakdown.ats_friendliness.missingKeywords.map((item, index) => (
                                        <li key={index} className="pl-4 border-l-2 border-yellow-500/70 dark:border-yellow-400/70">
                                            <strong className="text-light-brand dark:text-dark-brand">{item.keyword}</strong>
                                            <p className="text-sm italic text-light-text-secondary dark:text-dark-text-secondary">{item.integrationSuggestion}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                         {resumeAnalysis.scoreBreakdown.ats_friendliness.keywordDensity && resumeAnalysis.scoreBreakdown.ats_friendliness.keywordDensity.length > 0 && (
                            <div className="mt-4">
                                <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Keyword Density Analysis:</h5>
                                <ul className="space-y-2">
                                    {resumeAnalysis.scoreBreakdown.ats_friendliness.keywordDensity.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center text-sm p-2 bg-light-surface dark:bg-dark-surface rounded-md">
                                            <span className="font-medium text-light-text-secondary dark:text-dark-text-secondary">{item.keyword}</span>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                    item.importance === 'High' ? 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                                                    item.importance === 'Medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                                    'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                                                }`}>
                                                    {item.importance}
                                                </span>
                                                <span className="font-bold text-lg text-light-text-primary dark:text-dark-text-primary">{item.count}</span>
                                                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">mentions</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                      </div>
                  </div>
              </Card>
        </div>
        
        <Card title="Suggested Improvements" className="mb-12">
            {resumeAnalysis.suggestedFixes && resumeAnalysis.suggestedFixes.length > 0 ? (
              <ul className="space-y-4">
                  {resumeAnalysis.suggestedFixes.map((fix, i) => (
                      <li key={i} className="p-4 bg-light-bg dark:bg-dark-bg rounded-md border border-light-border dark:border-dark-border">
                          <h5 className="font-semibold text-light-brand dark:text-dark-brand">{fix.area}</h5>
                          <p className="text-light-text-primary dark:text-dark-text-primary mt-1 mb-2">{fix.suggestion}</p>
                          {renderExample(fix.example)}
                      </li>
                  ))}
              </ul>
            ) : (
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Your resume is strong! No major fixes suggested.</p>
            )}
        </Card>

          <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">AI-Enhanced Resume</h3>
          <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg p-6 rounded-lg border border-light-border dark:border-dark-border">
                  <h4 className="text-lg font-semibold mb-4 text-light-text-secondary dark:text-dark-text-secondary">New ATS Score</h4>
                  <ScoreGauge score={rewrittenResume.newAtsScore} />
            </div>
            <Card title="Rewritten Resume" className="max-h-96 overflow-y-auto relative">
                  <button 
                      onClick={handleCopy}
                      className="absolute top-4 right-4 px-3 py-1 text-sm bg-light-border dark:bg-dark-border text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                      {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                <pre className="whitespace-pre-wrap font-sans text-light-text-secondary dark:text-dark-text-secondary text-sm pt-8">
                    {rewrittenResume.rewrittenText}
                </pre>
            </Card>
          </div>
    </div>
  );
};

export default ResumeTab;
