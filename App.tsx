
import React, { useState, useCallback, useEffect } from 'react';
import UploadStep from './components/UploadStep';
import LoadingStep from './components/LoadingStep';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeResume, generateBackgroundImage } from './services/geminiService';
import type { AnalysisResults } from './types';
import ThemeSwitcher from './components/ThemeSwitcher';
import AiTransparency from './components/AiTransparency';

type AppState = 'upload' | 'loading' | 'results' | 'error';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [theme, setTheme] = useState<Theme>('dark');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [isBgLoading, setIsBgLoading] = useState(true);

  useEffect(() => {
    const fetchBgImage = async () => {
      try {
        setIsBgLoading(true);
        const imageUrl = await generateBackgroundImage();
        setBackgroundImageUrl(imageUrl);
      } catch (error) {
        console.error("Failed to generate background image:", error);
        // Fallback to a gradient if image generation fails
        setBackgroundImageUrl('');
      } finally {
        setIsBgLoading(false);
      }
    };
    fetchBgImage();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAnalysis = useCallback(async (resumeText: string, targetRole: string) => {
    setAppState('loading');
    setLoadingMessages([]);
    setErrorMessage('');
    
    const addMessage = (msg: string) => setLoadingMessages(prev => [...prev, msg]);

    try {
      const results = await analyzeResume(resumeText, targetRole, addMessage);
      setAnalysisResults(results);
      setAppState('results');
    } catch (error) {
      console.error("Analysis failed:", error);
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred during analysis.");
      setAppState('error');
    }
  }, []);

  const handleReset = () => {
    setAppState('upload');
    setAnalysisResults(null);
    setLoadingMessages([]);
    setErrorMessage('');
  };
  
  const backgroundStyle = (appState === 'upload' || appState === 'results') && !isBgLoading && backgroundImageUrl 
  ? { backgroundImage: `url(${backgroundImageUrl})` }
  : {};

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <LoadingStep messages={loadingMessages} />;
      case 'results':
        return analysisResults && <ResultsDashboard results={analysisResults} onReset={handleReset} />;
      case 'error':
        return (
          <div className="text-center bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-xl border border-light-border dark:border-dark-border">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Analysis Failed</h2>
            <p className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-light-brand dark:bg-dark-brand text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        );
      case 'upload':
      default:
        return (
          <>
            <UploadStep onAnalyze={handleAnalysis} />
            <AiTransparency />
          </>
        );
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans text-light-text-primary dark:text-dark-text-primary transition-all duration-500 ${(appState === 'upload' || appState === 'results') ? 'bg-cover bg-center' : ''}`}
      style={backgroundStyle}
    >
        <div className={`min-h-screen transition-colors duration-500 ${(appState === 'upload' || appState === 'results') ? 'bg-black/60' : ''}`}>
          <main className="container mx-auto px-4 py-8 md:py-12">
            <header className="text-center mb-10 md:mb-16 relative">
              <div className="absolute top-0 right-0">
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-300 dark:from-blue-500 dark:via-purple-500 dark:to-teal-400 pb-2">
                CareerBoard
              </h1>
              <p className="text-gray-200 dark:text-dark-text-secondary mt-2 text-xl md:text-2xl font-handwriting">
                Your board for skills, projects, and improvement.
              </p>
            </header>
            {renderContent()}
          </main>
          <footer className="text-center py-6 text-light-text-secondary dark:text-dark-text-secondary text-sm">
            <p>All rights reserved © CareerBoard {new Date().getFullYear()}</p>
          </footer>
        </div>
    </div>
  );
};

export default App;
