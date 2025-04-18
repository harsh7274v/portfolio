import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProjectCard from '../components/projects/ProjectCard'
import { projectsData } from '../data/projectsData'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Get unique categories
  const categories = ['all', ...new Set(projectsData.flatMap(project => project.categories))]
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(filter))

  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">My Projects</h1>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Explore my portfolio of projects showcasing my skills in web development, 
        machine learning, and more.
      </p>
      
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center mb-12 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === category 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Projects grid */}
      <motion.div 
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-dark-500 dark:text-gray-400">
            No projects found for this category.
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default Projects