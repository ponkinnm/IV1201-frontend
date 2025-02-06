import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListApplicants from './ListApplicants.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListApplicants />
  </StrictMode>,
)
