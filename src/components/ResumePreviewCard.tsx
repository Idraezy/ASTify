import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface ResumePreviewCardProps {
  resumeText: string;
}

export const ResumePreviewCard = ({ resumeText }: ResumePreviewCardProps) => {
  const preview = resumeText.length > 500 ? resumeText.substring(0, 500) + '...' : resumeText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
        <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
          {preview}
        </pre>
      </div>
    </motion.div>
  );
};
