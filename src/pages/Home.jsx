import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentView, setCurrentView] = useState('inventory')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navigationItems = [
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { id: 'customers', label: 'Customers', icon: 'Users' },
    { id: 'repairs', label: 'Repairs', icon: 'Wrench' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Monitor" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TechDepot
                </h1>
                <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                  Computer Shop Management
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 shadow-soft"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon 
                  name={darkMode ? 'Sun' : 'Moon'} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-surface-600 dark:text-surface-400" 
                />
              </motion.button>
              
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="User" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 sticky top-16 sm:top-20 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name={item.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MainFeature currentView={currentView} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm text-surface-600 dark:text-surface-400">
                © 2024 TechDepot. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
              >
                <ApperIcon name="Github" className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
              >
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
              >
                <ApperIcon name="Mail" className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home