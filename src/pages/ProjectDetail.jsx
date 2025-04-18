import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import { projectsData } from '../data/projectsData'

const ProjectDetail = () => {
  const { id } = useParams()
  const project = projectsData.find(p => p.id === id)
  
  if (!project) {
    return (
      <div className="section-container text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="btn-primary">
          Back to Projects
        </Link>
      </div>
    )
  }
  
  const {
    title,
    description,
    longDescription,
    image,
    categories,
    technologies,
    features,
    challenges,
    solutions,
    githubUrl,
    liveUrl,
    date
  } = project

  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/projects" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Projects
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Project main info */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-900 dark:text-white">
            {title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category, index) => (
              <span 
                key={index} 
                className="text-sm px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <img 
              src={image || "https://via.placeholder.com/1200x675?text=Project+Image"} 
              alt={title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg font-medium text-dark-800 dark:text-gray-200 mb-6">
              {description}
            </p>
            
            {longDescription && (
              <div className="mb-10 text-dark-700 dark:text-gray-300">
                {longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}
            
            {features && features.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Key Features</h2>
                <ul className="list-disc pl-5 space-y-2 text-dark-700 dark:text-gray-300">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {challenges && challenges.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Challenges</h2>
                <ul className="list-disc pl-5 space-y-2 text-dark-700 dark:text-gray-300">
                  {challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {solutions && solutions.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Solutions</h2>
                <ul className="list-disc pl-5 space-y-2 text-dark-700 dark:text-gray-300">
                  {solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Project sidebar info */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-dark-900 dark:text-white">
                Project Links
              </h3>
              <div className="flex flex-col space-y-2">
                {githubUrl && (
                  <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <FiGithub className="mr-2" /> GitHub Repository
                  </a>
                )}
                {liveUrl && (
                  <a 
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <FiExternalLink className="mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>
            
            {date && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2 text-dark-900 dark:text-white">
                  Completed
                </h3>
                <p className="text-dark-600 dark:text-gray-400">{date}</p>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-dark-900 dark:text-white">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
              <Link 
                to="/contact" 
                className="btn-primary w-full text-center"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetail