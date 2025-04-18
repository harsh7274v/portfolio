import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projectsData } from '../../data/projectsData'
import ProjectCard from '../projects/ProjectCard'

const FeaturedProjects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Get featured projects (limit to 3)
  const featuredProjects = projectsData
    .filter(project => project.featured)
    .slice(0, 3)

  return (
    <div className="section-container">
      <h2 className="section-title">Featured Projects</h2>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        A selection of my best and most impactful work.
      </p>
      
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      
      <div className="flex justify-center mt-12">
        <Link to="/projects" className="btn-outline">
          View All Projects
        </Link>
      </div>
    </div>
  )
}

export default FeaturedProjects