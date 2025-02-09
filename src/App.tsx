import ListApplicants from './pages/ListApplicants.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/Header.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListApplicants />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
