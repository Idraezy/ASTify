import type { ATSAnalysis } from '../types';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with'
]);

export const extractKeywords = (text: string): string[] => {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));

  const phrases = text
    .toLowerCase()
    .match(/\b[a-z]+(?:[-.][a-z]+)+\b/g) || [];

  const multiWordSkills = text
    .toLowerCase()
    .match(/\b(?:machine learning|data science|project management|cloud computing|web development|software engineering|full stack|front end|back end|data analysis|artificial intelligence|natural language processing|computer vision|deep learning|database management|version control|agile methodology|scrum master|business analysis|quality assurance|user experience|user interface|technical writing|customer service|problem solving|critical thinking|time management|team leadership|strategic planning)\b/g) || [];

  const combined = [...new Set([...words, ...phrases, ...multiWordSkills])];

  const frequency: { [key: string]: number } = {};
  combined.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([word]) => word);
};

export const calculateMatchPercentage = (resumeKeywords: string[], jobKeywords: string[]): number => {
  if (jobKeywords.length === 0) return 0;

  const matches = jobKeywords.filter(keyword =>
    resumeKeywords.some(rk => rk.includes(keyword) || keyword.includes(rk))
  );

  return Math.round((matches.length / jobKeywords.length) * 100);
};

export const findMissingKeywords = (resumeKeywords: string[], jobKeywords: string[]): string[] => {
  return jobKeywords.filter(keyword =>
    !resumeKeywords.some(rk => rk.includes(keyword) || keyword.includes(rk))
  ).slice(0, 15);
};

export const findMatchedKeywords = (resumeKeywords: string[], jobKeywords: string[]): string[] => {
  return jobKeywords.filter(keyword =>
    resumeKeywords.some(rk => rk.includes(keyword) || keyword.includes(rk))
  ).slice(0, 20);
};

export const calculateKeywordDensity = (text: string): number => {
  const words = text.split(/\s+/).length;
  const keywords = extractKeywords(text);

  if (words === 0) return 0;
  return Math.round((keywords.length / words) * 100);
};

export const generateSuggestions = (analysis: Partial<ATSAnalysis>): string[] => {
  const suggestions: string[] = [];

  if ((analysis.score || 0) < 50) {
    suggestions.push('Your resume needs significant improvement to pass ATS screening');
  }

  if ((analysis.matchPercentage || 0) < 40) {
    suggestions.push('Add more keywords from the job description to improve relevance');
  }

  if ((analysis.missingKeywords?.length || 0) > 10) {
    suggestions.push('Focus on incorporating high-priority missing keywords');
  }

  const resumeText = analysis.resumeText || '';

  if (!/\d+/.test(resumeText)) {
    suggestions.push('Include quantifiable achievements with numbers and metrics');
  }

  if (!/(led|managed|created|developed|implemented|achieved|improved|increased|reduced)/i.test(resumeText)) {
    suggestions.push('Use strong action verbs to describe your accomplishments');
  }

  if (resumeText.length < 500) {
    suggestions.push('Expand your resume with more detailed experience descriptions');
  }

  if ((analysis.keywordDensity || 0) < 3) {
    suggestions.push('Increase keyword density by adding relevant technical skills');
  }

  if (!/(certification|certified|degree|bachelor|master)/i.test(resumeText)) {
    suggestions.push('Add certifications or educational qualifications if applicable');
  }

  if ((analysis.matchPercentage || 0) >= 40 && (analysis.matchPercentage || 0) < 60) {
    suggestions.push('Good start! Add a few more relevant skills to boost your match');
  }

  if ((analysis.matchPercentage || 0) >= 60 && (analysis.matchPercentage || 0) < 80) {
    suggestions.push('Strong match! Optimize formatting and add missing keywords');
  }

  if ((analysis.matchPercentage || 0) >= 80) {
    suggestions.push('Excellent keyword match! Ensure formatting is ATS-friendly');
  }

  if (suggestions.length === 0) {
    suggestions.push('Your resume looks good! Review for any formatting issues');
  }

  return suggestions.slice(0, 8);
};

export const calculateATSScore = (
  matchPercentage: number,
  keywordDensity: number,
  resumeText: string
): number => {
  let score = 0;

  score += matchPercentage * 0.5;

  score += Math.min(keywordDensity * 3, 20);

  const hasNumbers = /\d+/.test(resumeText);
  const hasActionVerbs = /(led|managed|created|developed|implemented|achieved|improved|increased|reduced)/i.test(resumeText);
  const hasEducation = /(certification|certified|degree|bachelor|master)/i.test(resumeText);
  const hasContact = /(email|phone|linkedin|github)/i.test(resumeText);

  if (hasNumbers) score += 8;
  if (hasActionVerbs) score += 8;
  if (hasEducation) score += 7;
  if (hasContact) score += 7;

  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount >= 300 && wordCount <= 1000) {
    score += 10;
  } else if (wordCount > 200) {
    score += 5;
  }

  return Math.min(Math.round(score), 100);
};

export const analyzeResume = (resumeText: string, jobDescription: string): ATSAnalysis => {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescription);

  const matchPercentage = calculateMatchPercentage(resumeKeywords, jobKeywords);
  const keywordDensity = calculateKeywordDensity(resumeText);
  const matchedKeywords = findMatchedKeywords(resumeKeywords, jobKeywords);
  const missingKeywords = findMissingKeywords(resumeKeywords, jobKeywords);

  const score = calculateATSScore(matchPercentage, keywordDensity, resumeText);

  const partialAnalysis: Partial<ATSAnalysis> = {
    score,
    matchPercentage,
    keywordDensity,
    matchedKeywords,
    missingKeywords,
    resumeText,
  };

  const suggestions = generateSuggestions(partialAnalysis);

  return {
    score,
    matchPercentage,
    keywordDensity,
    matchedKeywords,
    missingKeywords,
    suggestions,
    resumeText,
    jobDescription,
    timestamp: Date.now(),
  };
};
