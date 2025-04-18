import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { educationData, certificationsData } from '../data/educationData'

const Education = () => {
  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Education & Certifications</h1>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        My academic background and professional certifications.
      </p>
      
      {/* Education Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-dark-800 dark:text-white">Education</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {educationData.map((item, index) => (
            <EducationItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      {/* Certifications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center text-dark-800 dark:text-white">Certifications</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((item, index) => (
            <CertificationItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const EducationItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  
  return (
    <motion.div
      ref={ref}
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-bold text-dark-800 dark:text-white">{item.degree}</h3>
            <h4 className="text-lg text-dark-600 dark:text-gray-300">{item.institution}</h4>
          </div>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            {item.period}
          </span>
        </div>
        
        <p className="text-dark-600 dark:text-gray-400 mb-4">{item.description}</p>
        
        {item.achievements && (
          <div>
            <h5 className="font-semibold text-dark-800 dark:text-white mb-2">Achievements:</h5>
            <ul className="list-disc ml-5 text-dark-600 dark:text-gray-400 space-y-1">
              {item.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        
        {item.coursework && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-700">
            <h5 className="font-semibold text-dark-800 dark:text-white mb-2">Relevant Coursework:</h5>
            <div className="flex flex-wrap gap-2">
              {item.coursework.map((course, i) => (
                <span 
                  key={i} 
                  className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const CertificationItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  
  return (
    <motion.div
      ref={ref}
      className="card p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
        <h3 className="text-lg font-bold text-dark-800 dark:text-white">{item.name}</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
          {item.date}
        </span>
      </div>
      
      <h4 className="text-base text-dark-600 dark:text-gray-300 mb-3">{item.issuer}</h4>
      
      <p className="text-dark-600 dark:text-gray-400 mb-4 flex-grow">{item.description}</p>
      
      {item.skills && (
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-dark-700">
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.credentialUrl && (
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-primary-500 hover:text-primary-600 text-sm font-medium inline-flex items-center"
        >
          View Credential
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </motion.div>
  )
}

export default Education