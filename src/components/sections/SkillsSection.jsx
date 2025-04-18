import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillsData } from '../../data/skillsData'

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const categories = ['all', ...new Set(skillsData.map(skill => skill.category))]
  
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory)

  return (
    <div className="section-container">
      <h2 className="section-title">My Skills</h2>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        A comprehensive overview of my technical skills and expertise.
      </p>
      
      {/* Category filters */}
      <div className="flex flex-wrap justify-center mb-12 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${activeCategory === category 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Skills grid */}
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
        {filteredSkills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </motion.div>
    </div>
  )
}

const SkillCard = ({ skill, index }) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <motion.div
      ref={cardRef}
      className="card p-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.05
          }
        }
      }}
    >
      <h3 className="text-xl font-bold mb-4 text-dark-800 dark:text-white">{skill.name}</h3>
      <p className="text-dark-600 dark:text-gray-400 mb-6">{skill.description}</p>
      
      {skill.technologies && (
        <div className="space-y-4">
          {skill.technologies.map((tech, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-dark-700 dark:text-gray-300">{tech.name}</span>
                <span className="text-xs font-medium text-dark-500 dark:text-gray-400">{tech.level}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500 rounded-full progress-bar"
                  initial={{ width: 0 }}
                  animate={cardInView ? { width: `${tech.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default SkillsSection