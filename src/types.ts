export interface ATSAnalysis {
  score: number;
  matchPercentage: number;
  keywordDensity: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  resumeText: string;
  jobDescription: string;
  timestamp: number;
}

export interface ResumeData {
  text: string;
  fileName?: string;
}
