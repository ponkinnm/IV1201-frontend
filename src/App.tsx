import './App.css';
import ListApplicants from './ListApplicants.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/applicants" element={<ListApplicants />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
