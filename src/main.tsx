import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ApplicantTable from './ApplicantTable.tsx'
import ListApplicants from './listApplicants.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListApplicants />
  </StrictMode>,
)
