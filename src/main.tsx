import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
// import all Web Awesome styles, including the default theme
import '@awesome.me/webawesome/dist/styles/webawesome.css';

// Optional: import your preferred theme
import '@awesome.me/webawesome/dist/styles/themes/awesome.css';

// Load Web Awesome styles + all components ONCE to avoid duplicate registry errors
import '@awesome.me/webawesome/dist/styles/themes/default.css'
import '@awesome.me/webawesome/dist/styles/native.css'
import '@awesome.me/webawesome/dist/styles/utilities.css'
import '@awesome.me/webawesome/dist/webawesome.js'



createRoot(document.getElementById('root')!).render(<App />)
