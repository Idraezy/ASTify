import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';
import { useNavigate } from '../router';
import { TextArea } from '../components/TextArea';
import { AnimatedButton } from '../components/AnimatedButton';
import { storage } from '../utils/storage';
import { analyzeResume } from '../utils/atsAnalyzer';

export const JobDescriptionPage = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    const savedResume = storage.getResume();
    if (!savedResume) {
      navigate('/upload');
    }

    const savedJobDesc = storage.getJobDescription();
    if (savedJobDesc) {
      setJobDescription(savedJobDesc);
    }
  }, [navigate]);

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      const resume = storage.getResume();
      if (resume) {
        storage.saveJobDescription(jobDescription);
        const analysis = analyzeResume(resume.text, jobDescription);
        storage.saveAnalysis(analysis);
        navigate('/results');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Add Job Description
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Paste the job description you're targeting for accurate analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
        >
          <TextArea
            value={jobDescription}
            onChange={setJobDescription}
            placeholder="Paste the complete job description here, including requirements, qualifications, and responsibilities..."
            label="Job Description"
            rows={18}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-between items-center gap-4"
          >
            <AnimatedButton
              onClick={() => navigate('/upload')}
              variant="outline"
              icon={ArrowLeft}
            >
              Back
            </AnimatedButton>
            <AnimatedButton
              onClick={handleAnalyze}
              disabled={!jobDescription.trim()}
              icon={ArrowRight}
            >
              Analyze Resume
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
        >
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            What to Include:
          </h3>
          <ul className="space-y-2 text-sm text-green-800 dark:text-green-400">
            <li>• Complete job title and description</li>
            <li>• Required skills and qualifications</li>
            <li>• Preferred experience and education</li>
            <li>• Key responsibilities and duties</li>
            <li>• Any specific tools or technologies mentioned</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The more complete the job description, the more accurate the analysis
          </p>
        </motion.div>
      </div>
    </div>
  );
};
