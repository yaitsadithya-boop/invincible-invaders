import React, { useState, useRef, useEffect } from 'react';
import type { AnalysisResults } from '../types';
import SkillGapTab from './SkillGapTab';
import ResourcesTab from './ResourcesTab';
import ResumeTab from './ResumeTab';
import RoadmapTab from './RoadmapTab';
import ReportForPrint from './ReportForPrint';
import { generateSectionBackgroundImage } from '../services/geminiService';
import { Spinner } from './common/Spinner';

declare var jspdf: any;
declare var html2canvas: any;

interface ResultsDashboardProps {
  results: AnalysisResults;
  onReset: () => void;
}

type Tab = 'skills' | 'resources' | 'resume' | 'roadmap';

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('skills');
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [backgrounds, setBackgrounds] = useState<Record<Tab, string>>({
    skills: '',
    resources: '',
    resume: '',
    roadmap: '',
  });
  const [areBgsLoading, setAreBgsLoading] = useState(true);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        setAreBgsLoading(true);
        const [skillsBg, resourcesBg, resumeBg, roadmapBg] = await Promise.all([
          generateSectionBackgroundImage('Skill Gaps'),
          generateSectionBackgroundImage('Learning Resources'),
          generateSectionBackgroundImage('Resume Review'),
          generateSectionBackgroundImage('Personalized Roadmap'),
        ]);
        setBackgrounds({
          skills: skillsBg,
          resources: resourcesBg,
          resume: resumeBg,
          roadmap: roadmapBg,
        });
      } catch (error) {
        console.error("Failed to fetch section background images:", error);
      } finally {
        setAreBgsLoading(false);
      }
    };

    if (results) {
      fetchBackgrounds();
    }
  }, [results]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'skills', label: 'Skill Gap Analysis' },
    { id: 'resources', label: 'Learning Resources' },
    { id: 'resume', label: 'Resume Review' },
    { id: 'roadmap', label: 'Personalized Roadmap' },
  ];

  const handleExport = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    try {
        const canvas = await html2canvas(printRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('CareerBoard_Report.pdf');
    } catch (error) {
        console.error("Error exporting to PDF:", error);
    } finally {
        setIsExporting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillGapTab skillGaps={results.skillGaps} />;
      case 'resources':
        return <ResourcesTab resources={results.resources} />;
      case 'resume':
        return <ResumeTab resumeAnalysis={results.resumeAnalysis} rewrittenResume={results.rewrittenResume} />;
      case 'roadmap':
        return <RoadmapTab roadmap={results.roadmap} />;
      default:
        return null;
    }
  };

  const activeBgUrl = backgrounds[activeTab];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Hidden component for printing */}
      <div className="absolute -left-[9999px] -top-[9999px]">
          <ReportForPrint ref={printRef} results={results} />
      </div>

      <div className="flex flex-wrap justify-between items-center mb-8 px-1 gap-4">
        <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Your Personalized Report</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[150px]"
          >
            {isExporting ? (
              <>
                <Spinner size="w-5 h-5" />
                <span className="ml-2">Exporting...</span>
              </>
            ) : 'Export as PDF'}
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors border border-light-border dark:border-dark-border"
          >
            Analyze Another
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Area (Left) */}
        <div
          className="flex-grow md:w-3/4 rounded-lg shadow-xl border border-light-border dark:border-dark-border overflow-hidden transition-all duration-700 bg-cover bg-center relative"
          style={{ backgroundImage: activeBgUrl ? `url(${activeBgUrl})` : 'none' }}
        >
          {areBgsLoading && (
            <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm z-10">
              <Spinner />
            </div>
          )}
          <div key={activeTab} className="animate-slide-in-up">
            {renderTabContent()}
          </div>
        </div>

        {/* Tabs (Right) */}
        <div className="md:w-1/4 flex flex-row md:flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-4 rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg focus:ring-light-brand dark:focus:ring-dark-brand
                ${activeTab === tab.id
                  ? 'bg-light-brand dark:bg-dark-brand text-white shadow-lg'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-border/50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;