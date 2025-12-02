import { motion } from 'framer-motion';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}

export const TextArea = ({ value, onChange, placeholder, label, rows = 10 }: TextAreaProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {value.split(/\s+/).filter(Boolean).length} words
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {value.length} characters
        </p>
      </div>
    </motion.div>
  );
};
