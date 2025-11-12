import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './main.css'

import '@awesome.me/webawesome/dist/webawesome.js'

createRoot(document.getElementById('root')!).render(<App />)
