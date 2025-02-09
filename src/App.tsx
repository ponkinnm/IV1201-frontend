import './App.css'
import ListApplicants from './ListApplicants.tsx'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline />
      <ListApplicants />
      <div className="outer-container"></div>
    </>
  )
}

export default App
