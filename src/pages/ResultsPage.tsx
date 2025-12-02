import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Target, Lightbulb, TrendingUp, Zap, Award, AlertCircle } from 'lucide-react';
import { useNavigate } from '../router';
import { ATSScoreCircle } from '../components/ATSScoreCircle';
import { KeywordMeter } from '../components/KeywordMeter';
import { MissingSkillsList } from '../components/MissingSkillsList';
import { SuggestionCard } from '../components/SuggestionCard';
import { ResumePreviewCard } from '../components/ResumePreviewCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { storage } from '../utils/storage';
import type { ATSAnalysis } from '../types';
import { improveResume, downloadResume } from '../utils/resumeImprover';
import { analyzeResume } from '../utils/atsAnalyzer';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [showImprovedPreview, setShowImprovedPreview] = useState(false);
  const [improvedAnalysis, setImprovedAnalysis] = useState<ATSAnalysis | null>(null);

  useEffect(() => {
    const savedAnalysis = storage.getAnalysis();
    if (!savedAnalysis) {
      navigate('/upload');
    } else {
      setAnalysis(savedAnalysis);
      generateImprovedAnalysis(savedAnalysis);
    }
  }, [navigate]);

  const generateImprovedAnalysis = (currentAnalysis: ATSAnalysis) => {
    const improved = improveResume(currentAnalysis.resumeText, currentAnalysis.missingKeywords);
    const newAnalysis = analyzeResume(improved, currentAnalysis.jobDescription);
    setImprovedAnalysis(newAnalysis);
  };

  if (!analysis) return null;

  const handleDownloadImproved = () => {
    const improved = improveResume(analysis.resumeText, analysis.missingKeywords);
    downloadResume(improved, 'improved-resume.txt');
  };

  const handleUseImproved = () => {
    if (improvedAnalysis) {
      storage.saveResume({ text: improveResume(analysis.resumeText, analysis.missingKeywords) });
      storage.saveAnalysis(improvedAnalysis);
      setAnalysis(improvedAnalysis);
      setShowImprovedPreview(false);
    }
  };

  const handleStartOver = () => {
    storage.clear();
    navigate('/upload');
  };

  const suggestionIcons = [Lightbulb, TrendingUp, Zap, Award, Target, AlertCircle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your ATS Analysis Results
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Here's how your resume performs against the job description
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Overall ATS Score
            </h2>
            <ATSScoreCircle score={analysis.score} />
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
              This score represents how well your resume matches the job requirements and ATS best practices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Key Metrics
            </h2>
            <div className="space-y-6">
              <KeywordMeter
                label="Job Match Percentage"
                value={analysis.matchPercentage}
                color={analysis.matchPercentage >= 60 ? 'green' : analysis.matchPercentage >= 40 ? 'blue' : 'orange'}
              />
              <KeywordMeter
                label="Keyword Density"
                value={analysis.keywordDensity}
                max={15}
                color="blue"
              />
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Matched Keywords</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {analysis.matchedKeywords.length}
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Missing Keywords</p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {analysis.missingKeywords.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Missing Keywords
          </h2>
          <MissingSkillsList skills={analysis.missingKeywords} />
        </motion.div>

        {analysis.matchedKeywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Matched Keywords ({analysis.matchedKeywords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.matchedKeywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.03 }}
                  className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Improvement Suggestions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {analysis.suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                icon={suggestionIcons[index % suggestionIcons.length]}
                title={`Suggestion ${index + 1}`}
                description={suggestion}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <ResumePreviewCard resumeText={analysis.resumeText} />
        </motion.div>

        {improvedAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">
                  Improved Resume Score Forecast
                </h2>
                <p className="text-green-800 dark:text-green-400">
                  Here's how your resume could perform with the suggested improvements
                </p>
              </div>
              <button
                onClick={() => setShowImprovedPreview(!showImprovedPreview)}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
              >
                {showImprovedPreview ? 'Hide' : 'Show'} Details
              </button>
            </div>

            {showImprovedPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 mb-6 pt-6 border-t border-green-200 dark:border-green-800"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-green-700 dark:text-green-400 mb-2">Current Score</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">{analysis.score}</p>
                    </div>
                    <div className="text-3xl text-green-500">→</div>
                    <div className="text-center">
                      <p className="text-sm text-green-700 dark:text-green-400 mb-2">Improved Score</p>
                      <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                        {improvedAnalysis.score}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        +{improvedAnalysis.score - analysis.score} points
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <KeywordMeter
                      label="Current Match %"
                      value={analysis.matchPercentage}
                      color="blue"
                    />
                    <KeywordMeter
                      label="Improved Match %"
                      value={improvedAnalysis.matchPercentage}
                      color="green"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    What's Been Improved:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>✓ Added {analysis.missingKeywords.length} missing keywords</li>
                    <li>✓ Replaced weak verbs with stronger action words</li>
                    <li>✓ Optimized keyword density</li>
                    <li>✓ Enhanced job relevance</li>
                  </ul>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                onClick={handleUseImproved}
                className="flex-1"
              >
                Use Improved Resume & Re-Check
              </AnimatedButton>
              <AnimatedButton
                onClick={handleDownloadImproved}
                variant="secondary"
                icon={Download}
                className="flex-1"
              >
                Download Improved Version
              </AnimatedButton>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AnimatedButton onClick={handleStartOver} variant="outline" icon={RefreshCw}>
            Start Over
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
};
