export const projectsData = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with React, Node.js, and Stripe integration for seamless online shopping experiences.',
    longDescription: 'This full-stack e-commerce solution provides businesses with a customizable online store. Built with React on the frontend and Node.js with Express on the backend, it features a responsive design, product catalog, cart management, user authentication, and secure checkout with Stripe.\n\nThe platform includes an admin dashboard for managing products, orders, and customer data, with comprehensive analytics to track sales performance. The clean, modern UI focuses on user experience with intuitive navigation and fast page loads optimized by code splitting and lazy loading.',
    image: '/src/assets/ecom.png',
    categories: ['web', 'fullstack'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS'],
    features: [
      'Responsive product catalog with filtering and search',
      'User authentication and profile management',
      'Shopping cart with persistent storage',
      'Secure payment processing with Stripe',
      'Order tracking and history',
      'Admin dashboard for inventory management'
    ],
    challenges: [
      'Implementing real-time inventory updates',
      'Optimizing image loading for performance',
      'Building a secure payment flow'
    ],
    solutions: [
      'Used WebSockets for real-time data synchronization',
      'Implemented lazy loading and image optimization',
      'Integrated Stripe\'s secure payment API with custom UI'
    ],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-platform-demo.com',
    date: 'June 2024',
    featured: true
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'A web application that uses machine learning to generate unique images from text prompts.',
    longDescription: "This project leverages OpenAI's DALL-E API to create unique images from text descriptions. Users can enter creative prompts and receive AI-generated images that match their descriptions.\n\nThe application features a clean, intuitive interface that makes it easy for users to generate, save, and share their creations. Built with React and Node.js, it includes user authentication, a gallery of past generations, and social sharing capabilities.",
    image: '/src/assets/ai.png',
    categories: ['ai', 'web'],
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'AWS S3', 'Tailwind CSS'],
    features: [
      'Text-to-image generation using DALL-E',
      'User account for saving and managing generated images',
      'Image gallery with filtering options',
      'Social media sharing integration',
      'Customization options for image generation'
    ],
    challenges: [
      'Managing API rate limits and costs',
      'Optimizing image storage and delivery',
      'Creating an intuitive UI for customization options'
    ],
    solutions: [
      'Implemented request queuing and caching',
      'Used AWS S3 for efficient image storage and CloudFront for delivery',
      'Designed a step-by-step interface with real-time previews'
    ],
    githubUrl: 'https://github.com/yourusername/ai-image-generator',
    liveUrl: 'https://ai-image-generator-demo.com',
    date: 'September 2024',
    featured: true
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker App',
    description: 'A mobile-first web application for tracking workouts, nutrition, and health metrics with data visualization.',
    longDescription: 'This comprehensive fitness tracker helps users monitor their workout routines, nutrition, and overall health progress. The application provides personalized workout plans, tracks calorie intake, and visualizes progress through interactive charts.\n\nBuilt with React for the frontend and Firebase for the backend, it features real-time data synchronization, offline support, and cross-device compatibility. The clean, intuitive interface makes it easy for users to log workouts, meals, and track their fitness journey.',
    image: '/src/assets/fitness.png',
    categories: ['web', 'mobile'],
    technologies: ['React', 'Firebase', 'Chart.js', 'Progressive Web App', 'Tailwind CSS'],
    features: [
      'Customizable workout plans and routines',
      'Nutrition tracking with calorie and macro calculations',
      'Progress visualization with interactive charts',
      'Goal setting and achievement tracking',
      'Workout timer and exercise demonstrations',
      'Social features for sharing achievements'
    ],
    challenges: [
      'Creating an intuitive mobile interface for quick logging',
      'Implementing accurate calorie and nutritional calculations',
      'Designing meaningful data visualizations'
    ],
    solutions: [
      'Used extensive user testing to refine the mobile UX',
      'Integrated a comprehensive nutritional database',
      'Developed custom Chart.js configurations for insightful visualizations'
    ],
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    liveUrl: 'https://fitness-tracker-demo.com',
    date: 'December 2023',
    featured: true
  },
  {
    id: 'smart-home-dashboard',
    title: 'Smart Home Dashboard',
    description: 'A centralized dashboard for controlling and monitoring smart home devices with automation capabilities.',
    image: '/src/assets/smarthome.jpg',
    categories: ['web', 'iot'],
    technologies: ['React', 'Node.js', 'MQTT', 'WebSockets', 'Chart.js', 'Tailwind CSS'],
    features: [
      'Unified control for multiple smart home devices',
      'Real-time monitoring and status updates',
      'Customizable automation rules',
      'Energy usage tracking and optimization',
      'Voice control integration'
    ],
    githubUrl: 'https://github.com/yourusername/smart-home-dashboard',
    liveUrl: 'https://smart-home-dashboard-demo.com',
    date: 'March 2024'
  },
  {
    id: 'language-learning-app',
    title: 'Language Learning App',
    description: 'An interactive application that helps users learn new languages through spaced repetition and gamification.',
    image: '/src/assets/languagelearning.jpg',
    categories: ['web', 'mobile', 'education'],
    technologies: ['React Native', 'Firebase', 'Redux', 'TensorFlow.js', 'i18n'],
    features: [
      'Spaced repetition algorithm for optimized learning',
      'Speech recognition for pronunciation practice',
      'Gamified learning experience with points and levels',
      'Progress tracking and personalized learning paths',
      'Offline learning support'
    ],
    githubUrl: 'https://github.com/yourusername/language-learning-app',
    liveUrl: 'https://language-learning-app-demo.com',
    date: 'February 2025'
  },
  {
    id: 'project-management-tool',
    title: 'Project Management Tool',
    description: 'A collaborative project management application with task tracking, team communication, and resource allocation.',
    image: '/src/assets/project.jpg',
    categories: ['web', 'productivity'],
    technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    features: [
      'Kanban and Gantt chart views for task management',
      'Real-time collaboration and commenting',
      'File sharing and document management',
      'Time tracking and reporting',
      'Integration with popular tools (GitHub, Slack, etc.)'
    ],
    githubUrl: 'https://github.com/yourusername/project-management-tool',
    liveUrl: 'https://project-management-tool-demo.com',
    date: 'November 2024'
  }
]