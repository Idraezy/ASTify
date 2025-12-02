import type { ATSAnalysis, ResumeData } from '../types'


const STORAGE_KEYS = {
  RESUME: 'ats_resume_data',
  ANALYSIS: 'ats_analysis_data',
  JOB_DESCRIPTION: 'ats_job_description',
  THEME: 'ats_theme',
};

export const storage = {
  saveResume: (data: ResumeData) => {
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(data));
  },

  getResume: (): ResumeData | null => {
    const data = localStorage.getItem(STORAGE_KEYS.RESUME);
    return data ? JSON.parse(data) : null;
  },

  saveJobDescription: (text: string) => {
    localStorage.setItem(STORAGE_KEYS.JOB_DESCRIPTION, text);
  },

  getJobDescription: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.JOB_DESCRIPTION);
  },

  saveAnalysis: (analysis: ATSAnalysis) => {
    localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(analysis));
  },

  getAnalysis: (): ATSAnalysis | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
    return data ? JSON.parse(data) : null;
  },

  saveTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  clear: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.THEME) {
        localStorage.removeItem(key);
      }
    });
  },
};


