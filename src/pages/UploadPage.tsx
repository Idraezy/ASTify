import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Type } from 'lucide-react';
import { useNavigate } from '../router';
import { DragDropUpload } from '../components/DragDropUpload';
import { TextArea } from '../components/TextArea';
import { AnimatedButton } from '../components/AnimatedButton';
import { storage } from '../utils/storage';

export const UploadPage = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'paste'>('upload');

  const handleFileUpload = (text: string, fileName: string) => {
    setResumeText(text);
    storage.saveResume({ text, fileName });
  };

  const handleContinue = () => {
    if (resumeText.trim()) {
      storage.saveResume({ text: resumeText });
      navigate('/job-description');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start by uploading your resume or pasting the text directly
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
        >
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setUploadMethod('upload')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                uploadMethod === 'upload'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setUploadMethod('paste')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                uploadMethod === 'paste'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Type className="w-4 h-4 inline mr-2" />
              Paste Text
            </button>
          </div>

          <motion.div
            key={uploadMethod}
            initial={{ opacity: 0, x: uploadMethod === 'upload' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {uploadMethod === 'upload' ? (
              <DragDropUpload onFileUpload={handleFileUpload} />
            ) : (
              <TextArea
                value={resumeText}
                onChange={setResumeText}
                placeholder="Paste your resume text here..."
                label="Resume Text"
                rows={15}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-between items-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your data is stored locally and never sent to any server
            </p>
            <AnimatedButton
              onClick={handleContinue}
              disabled={!resumeText.trim()}
              icon={ArrowRight}
            >
              Continue
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            TIPS FOR BEST RESULTS:
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>• Include all sections: EXPERIENCE, EDUCATION, SKILLS</li>
            <li>• Use PLAIN TEXT FORMAT for better parsing</li>
            <li>• Ensure your resume is CURRENT and COMPLETE</li>
            <li>• Remove any SENSITIVE information if needed</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-yellow-900/20 text-yellow-300 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        >
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
  
  <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-lg mb-3 flex items-center">
    ⚠️ Important Notice About ATS Accuracy
  </h3>

  <p className="text-amber-700 dark:text-amber-200 leading-relaxed mb-3">
    The ATS score and improvement suggestions provided by this tool are 
    <span className="font-semibold text-red-600"> estimates </span>  
    based on keyword matching and general applicant tracking system patterns. 
    While this analysis can help you optimize your resume, it is 
    <span className="font-semibold text-red-600"> not a guaranteed reflection </span>
    of how every real ATS will evaluate your resume.
  </p>

  <p className="text-amber-700 dark:text-amber-200 leading-relaxed mb-3">
    The <span className="font-medium text-red-600">IMPROVED RESUME GENERATED</span> by the system is designed to enhance keyword alignment, but:
  </p>

  <ul className="space-y-2 text-amber-700 dark:text-amber-200 text-sm list-disc list-inside mb-4">
    <li>It does not guarantee higher success with all ATS platforms.</li>
    <li>Different companies use different ATS algorithms with unique scoring methods.</li>
    <li>Final hiring decisions depend on human review, resume formatting, job requirements, and recruiter preferences.</li>
  </ul>

  <p className="text-amber-800 dark:text-amber-300 font-medium">
    Please use these results as a helpful guideline, not a definitive measurement of your resume’s performance.
  </p>

</div>

        </motion.div>
      </div>
    </div>
  );
};
