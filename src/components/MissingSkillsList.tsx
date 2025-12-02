import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface MissingSkillsListProps {
  skills: string[];
}

export const MissingSkillsList = ({ skills }: MissingSkillsListProps) => {
  if (skills.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center"
      >
        <p className="text-green-700 dark:text-green-400 font-medium">
          Great! Your resume covers all major keywords from the job description.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Missing Keywords ({skills.length})
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Consider adding these keywords from the job description to improve your ATS score.
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium border border-orange-200 dark:border-orange-800"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
