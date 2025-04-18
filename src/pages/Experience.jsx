import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experienceData } from '../data/experienceData'

const Experience = () => {
  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Professional Experience</h1>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        My journey as a developer, including work history and professional achievements.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-px bg-gray-200 dark:bg-dark-700 z-0"></div>
          
          {/* Experience items */}
          {experienceData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  
  const isEven = index % 2 === 0
  
  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col sm:flex-row items-center mb-12 sm:mb-16 ${
        isEven ? 'sm:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-dark-900 bg-primary-500 z-10"></div>
      
      {/* Date for mobile */}
      <div className="sm:hidden mb-4 text-center">
        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
          {item.period}
        </span>
      </div>
      
      {/* Content */}
      <div className={`w-full sm:w-5/12 px-4 ${isEven ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
        <div className="card p-6">
          <h3 className="text-xl font-bold text-dark-800 dark:text-white mb-1">{item.role}</h3>
          <h4 className="text-lg font-medium text-dark-600 dark:text-gray-300 mb-3">{item.company}</h4>
          
          {/* Date for desktop */}
          <div className="hidden sm:block mb-4">
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {item.period}
            </span>
          </div>
          
          <p className="text-dark-600 dark:text-gray-400 mb-4">{item.description}</p>
          
          {item.achievements && (
            <div>
              <h5 className="font-semibold text-dark-800 dark:text-white mb-2">Key Achievements:</h5>
              <ul className={`list-disc ${isEven ? 'sm:ml-5' : 'ml-5'} text-dark-600 dark:text-gray-400 space-y-1`}>
                {item.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
          
          {item.technologies && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-700">
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image container */}
      <div className={`w-full sm:w-6/12 px-4 flex items-center justify-center ${isEven ? 'sm:pr-12' : 'sm:pl-12'} relative z-10`}>
        <div className="relative w-full max-w-lg aspect-square rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
          <img
            src={item.image}
            alt={`${item.company} experience`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default Experience