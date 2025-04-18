import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    image,
    categories,
    technologies,
    githubUrl,
    liveUrl
  } = project

  return (
    <motion.div
      className="card overflow-hidden group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image || "https://via.placeholder.com/600x400?text=Project+Image"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="flex space-x-2">
            {githubUrl && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-dark-900 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="View GitHub repository"
              >
                <FiGithub />
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-dark-900 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="View live project"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
          <Link 
            to={`/projects/${id}`}
            className="text-xs px-3 py-1 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            >
              {category}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-dark-800 dark:text-white">
          {title}
        </h3>
        
        <p className="text-dark-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-dark-700">
          {technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300">
              +{technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard