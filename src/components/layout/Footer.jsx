import { Link } from 'react-router-dom'
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram, 
  FiMail 
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: 'GitHub', icon: <FiGithub />, url: 'https://github.com/harsh7274v' },
    { name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/in/harsh0204/' },
    { name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/harsh0204' },
    { name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/rane.harsh_01' },
    { name: 'Email', icon: <FiMail />, url: 'mailto:harshvardhan72774+work@gmail.com' },
  ]

  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-dark-800 dark:text-white">
                <span className="text-primary-500">&lt;/&gt;</span>
                <span className="ml-2"></span>
              </span>
            </Link>
            <p className="mt-4 text-dark-600 dark:text-gray-400 max-w-xs">
              Full Stack Developer & Machine Learning Enthusiast. Always learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-dark-900 dark:text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-dark-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</Link>
              <Link to="/projects" className="text-dark-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Projects</Link>
              <Link to="/experience" className="text-dark-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Experience</Link>
              <Link to="/education" className="text-dark-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Education</Link>
              <Link to="/contact" className="text-dark-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Social links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-dark-900 dark:text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300 hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700 text-center text-dark-500 dark:text-gray-400">
          <p>© {2025} Harsh Vardhan Prasad. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Passion & ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer