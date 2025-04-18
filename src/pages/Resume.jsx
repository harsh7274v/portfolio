import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiDownload, FiFileText, FiBriefcase, FiAward, FiUser } from 'react-icons/fi'

const Resume = () => {
  const resumeSections = [
    {
      title: 'Generalized',
      icon: <FiUser className="text-4xl text-primary-500" />,
      content: 'View my comprehensive CV covering all aspects of my professional journey.'
    },
    {
      title: 'Specialized',
      icon: <FiBriefcase className="text-4xl text-primary-500" />,
      content: 'Explore my specialized skills and expertise in detail.'
    },
    {
      title: 'Frontend',
      icon: <FiAward className="text-4xl text-primary-500" />,
      content: 'Check out my frontend development experience and projects.'
    },
    {
      title: 'Backend',
      icon: <FiFileText className="text-4xl text-primary-500" />,
      content: 'Discover my backend development capabilities and achievements.'
    }
  ]

  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">My Resume</h1>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        A comprehensive overview of my professional journey and qualifications.
      </p>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeSections.map((section, index) => (
          <ResumeSection key={index} section={section} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

const ResumeSection = ({ section, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  
  const handleOpenCV = () => {
    window.open('/resume.pdf', '_blank')
  }
  
  return (
    <motion.div
      ref={ref}
      className="card p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        {section.icon}
        <h3 className="text-xl font-bold ml-3 text-dark-800 dark:text-white">{section.title}</h3>
      </div>
      
      <p className="text-dark-600 dark:text-gray-400 mb-4 flex-grow">{section.content}</p>
      
      <button
        onClick={handleOpenCV}
        className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
      >
        <FiDownload className="mr-2" />
        View CV
      </button>
    </motion.div>
  )
}

export default Resume 