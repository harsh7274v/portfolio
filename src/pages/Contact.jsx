import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    errorMessage: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState({ ...formState, isSubmitting: true })
    
    // Simulate form submission
    setTimeout(() => {
      // Form validation
      if (!formData.name || !formData.email || !formData.message) {
        setFormState({
          isSubmitting: false,
          isSubmitted: false,
          isError: true,
          errorMessage: 'Please fill in all required fields.'
        })
        return
      }
      
      // Successful submission
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        errorMessage: ''
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Contact Me</h1>
      <p className="text-center text-dark-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Have a project in mind or want to discuss opportunities? I'd love to hear from you!
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-800 dark:text-white">Send Me a Message</h2>
            
            {formState.isSubmitted ? (
              <motion.div
                className="bg-success-500/10 border border-success-500/30 rounded-lg p-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-success-500 font-medium">
                  Thank you for your message! I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {formState.isError && (
                  <div className="bg-error-500/10 border border-error-500/30 rounded-lg p-4 mb-6">
                    <p className="text-error-500 font-medium">{formState.errorMessage}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-dark-700 dark:text-gray-300 font-medium mb-2">
                    Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-dark-700 dark:text-gray-300 font-medium mb-2">
                    Email <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-dark-700 dark:text-gray-300 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-dark-700 dark:text-gray-300 font-medium mb-2">
                    Message <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-dark-800 dark:text-white">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 mr-4">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-dark-800 dark:text-white mb-1">Email</h3>
                  <a href="mailto:harshvardhan7274+work@gmail.com" className="text-primary-500 hover:text-primary-600 transition-colors">
                    harshvardhan7274+work@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 mr-4">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-dark-800 dark:text-white mb-1">Location</h3>
                  <p className="text-dark-600 dark:text-gray-400">phagwara,punjab,India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 mr-4">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-dark-800 dark:text-white mb-1">Phone</h3>
                  <p className="text-dark-600 dark:text-gray-400">(+91) 8092824136</p>
                 
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-dark-800 dark:text-white mb-3">Follow Me</h3>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/harsh7274v" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon bg-dark-900 dark:bg-white text-white dark:text-dark-900"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a 
                  href="https://linkedin.com/in/harsh0204/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon bg-[#0077B5] text-white"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a 
                  href="https://twitter.com/harsh0204" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon bg-[#1DA1F2] text-white"
                  aria-label="Twitter"
                >
                  <FiTwitter />
                </a>
                <a 
                  href="https://instagram.com/rane.harsh_01" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact