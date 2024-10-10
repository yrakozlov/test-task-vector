import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './app/App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
