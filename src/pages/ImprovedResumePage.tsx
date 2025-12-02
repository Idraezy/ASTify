import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from '../router';
import { AnimatedButton } from '../components/AnimatedButton';
import  { storage } from '../utils/storage';
import { improveResume, downloadResume } from '../utils/resumeImprover';

export const ImprovedResumePage = () => {
  const navigate = useNavigate();
  const [improvedText, setImprovedText] = useState('');

  useEffect(() => {
    const analysis = storage.getAnalysis();
    if (!analysis) {
      navigate('/upload');
    } else {
      const improved = improveResume(analysis.resumeText, analysis.missingKeywords);
      setImprovedText(improved);
    }
  }, [navigate]);

  const handleDownload = () => {
    downloadResume(improvedText, 'improved-resume.txt');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Improved Resume Preview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Review your optimized resume with enhanced keywords and suggestions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
        >
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 max-h-[600px] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
              {improvedText}
            </pre>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-between items-center gap-4"
          >
            <AnimatedButton
              onClick={() => navigate('/results')}
              variant="outline"
              icon={ArrowLeft}
            >
              Back to Results
            </AnimatedButton>
            <AnimatedButton onClick={handleDownload} icon={Download}>
              Download Resume
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6"
        >
          <h3 className="font-semibold text-teal-900 dark:text-teal-300 mb-3">
            What's Been Improved:
          </h3>
          <ul className="space-y-2 text-sm text-teal-800 dark:text-teal-400">
            <li>• Replaced weak verbs with strong action words</li>
            <li>• Added missing keywords from the job description</li>
            <li>• Optimized formatting for ATS compatibility</li>
            <li>• Enhanced readability and impact</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
