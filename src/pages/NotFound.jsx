import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <ApperIcon name="AlertTriangle" className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-4 left-4 w-3 h-3 bg-secondary rounded-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-2 h-2 bg-accent rounded-full"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <motion.h1
              className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              404
            </motion.h1>
            
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              className="text-lg text-surface-600 dark:text-surface-400 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link
              to="/"
              className="group flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
            >
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Back to Home</span>
              <ApperIcon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 px-6 py-3 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 font-medium"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex items-center justify-center space-x-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-surface-300 dark:bg-surface-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound