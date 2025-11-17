
export interface SkillGapAnalysis {
  missingCoreSkills: string[];
  missingDemandingSkills: string[];
}

export interface Resource {
  practiceQuestions: Array<{
    text: string;
    link: string;
    platform: string;
  }>;
  projectIdeas: string[];
  learningResources: Array<{
    title: string;
    link: string;
  }>;
  youtubeRecommendations?: Array<{
    channelName: string;
    playlistName: string;
    playlistLink: string;
  }>;
}

export interface Resources {
  [skill: string]: Resource;
}

export interface KeywordDensity {
  keyword: string;
  count: number;
  importance: 'High' | 'Medium' | 'Low';
}

export interface AtsFriendlinessAnalysis {
  summary: string;
  formattingSummary: string;
  missingKeywords: Array<{
    keyword: string;
    integrationSuggestion: string;
  }>;
  keywordDensity: KeywordDensity[];
}

export interface ResumeAnalysis {
  atsScore: number;
  scoreBreakdown: {
    clarity: string;
    impact: string;
    ats_friendliness: AtsFriendlinessAnalysis;
  };
  suggestedFixes: Array<{
    area: string;
    suggestion: string;
    example: string;
  }>;
}

export interface RewrittenResume {
  rewrittenText: string;
  newAtsScore: number;
}

export interface RoadmapWeek {
  week: number;
  focus: string;
  dailyPlan: Array<{
    day: string;
    tasks: Array<string | { task: string; link?: string }>;
  }>;
}

export interface PersonalizedRoadmap {
  roadmap: RoadmapWeek[];
}

export interface AnalysisResults {
  skillGaps: SkillGapAnalysis;
  resources: Resources;
  resumeAnalysis: ResumeAnalysis;
  rewrittenResume: RewrittenResume;
  roadmap: PersonalizedRoadmap;
}