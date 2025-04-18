import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'

// Components
import SkillsSection from '../components/sections/SkillsSection'
import FeaturedProjects from '../components/sections/FeaturedProjects'

const Home = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/20 to-transparent dark:from-primary-900/10 dark:to-transparent -z-10"></div>
        
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-dark-900 dark:text-white"
              variants={itemVariants}
            >
              Hello. <br />
              <span>I'm <span className="text-accent-500">Harsh vardhan Prasad</span></span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-6 text-dark-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Full Stack Developer & <br />
              Machine Learning Enthusiast
            </motion.p>
            
            <motion.p 
              className="mb-8 text-dark-500 dark:text-gray-400 max-w-md"
              variants={itemVariants}
            >
              I build exceptional digital experiences with a focus on performance, 
              accessibility, and cutting-edge technology.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4 mb-8"
              variants={itemVariants}
            >
              <a 
                href="https://github.com/harsh7274v" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-dark-900 dark:bg-white text-white dark:text-dark-900"
              >
                <FiGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/harsh0204/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-[#0077B5] text-white"
              >
                <FiLinkedin />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-[#1DA1F2] text-white"
              >
                <FiTwitter />
              </a>
              <a 
                href="https://instagram.com/rane.harsh_01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white"
              >
                <FiInstagram />
              </a>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Link to="/contact" className="btn-primary">
                Contact Me
              </Link>
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.img 
                src="https://cdn.dribbble.com/users/1059583/screenshots/4171367/coding-freak.gif"
                alt="Programming Animation"
                className="w-full h-full object-cover rounded-xl shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
              />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        className="py-16 bg-gray-50 dark:bg-dark-800"
        initial={{ opacity: 0, y: 50 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-container">
          <SkillsSection />
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section
        ref={projectsRef}
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-container">
          {/* <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-dark-600 dark:text-gray-300 max-w-2xl mx-auto">
              Some of my recent work that I'm particularly proud of
            </p>
          </motion.div> */}
          <FeaturedProjects />
        </div>
      </motion.section>
    </>
  )
}

export default Home