import { motion } from 'framer-motion';

interface KeywordMeterProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  suffix?: string;
}

export const KeywordMeter = ({ label, value, max = 100, color = 'blue', suffix = '%' }: KeywordMeterProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'orange':
        return 'bg-orange-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {value}{suffix}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${getColorClasses()} rounded-full`}
        />
      </div>
    </motion.div>
  );
};
