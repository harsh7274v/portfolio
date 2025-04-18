import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <motion.div
      className="section-container flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-8xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-800 dark:text-white text-center">
        Page Not Found
      </h2>
      <p className="text-lg text-dark-600 dark:text-gray-400 max-w-md text-center mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </motion.div>
  )
}

export default NotFound