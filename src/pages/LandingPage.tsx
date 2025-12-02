import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from '../router';
import { AnimatedButton } from '../components/AnimatedButton';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on how well your resume matches job requirements',
    },
    {
      icon: Zap,
      title: 'Keyword Optimization',
      description: 'Identify missing keywords and optimize your resume for better visibility',
    },
    {
      icon: TrendingUp,
      title: 'Smart Suggestions',
      description: 'Receive actionable recommendations to improve your resume effectiveness',
    },
  ];

  const benefits = [
    'Increase your chances of getting interviews',
    'Beat the Applicant Tracking System',
    'Optimize for specific job descriptions',
    'Get instant, actionable feedback',
    'No signup required',
    '100% free to use',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
          >
            <span className="text-blue-700 dark:text-blue-400 font-semibold text-sm">
              ✨ Free Resume ATS Checker
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Land Your Dream Job with
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ATS-Optimized Resume
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Beat the bots and land interviews. Our AI-powered ATS checker analyzes your resume against job descriptions and provides instant optimization suggestions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton onClick={() => navigate('/upload')} icon={ArrowRight}>
              Start Analyzing Free
            </AnimatedButton>
            <AnimatedButton variant="outline" onClick={() => navigate('/upload')}>
              See How It Works
            </AnimatedButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Use ATS Pro?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <AnimatedButton
                onClick={() => navigate('/upload')}
                variant="secondary"
                icon={ArrowRight}
              >
                Get Started Now
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Three simple steps to optimize your resume and increase your interview chances
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Resume', desc: 'Upload or paste your resume text' },
              { step: '02', title: 'Add Job Description', desc: 'Paste the job description you\'re targeting' },
              { step: '03', title: 'Get Results', desc: 'Receive detailed analysis and suggestions' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-blue-100 dark:text-blue-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
