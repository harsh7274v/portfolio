import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Page components
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Resume from './pages/Resume'

// Utility components
import ScrollToTop from './components/utils/ScrollToTop'
import Cursor from './components/utils/Cursor'
import Chatbot from './components/Chatbot'

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-dark-900 z-50">
        <div className="w-16 h-16 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Navbar />
      
      <main className="min-h-screen pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
      <Chatbot />
    </>
  )
}

export default App