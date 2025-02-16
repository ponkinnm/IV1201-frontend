import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';
import ListApplicants from './pages/ListApplicants.tsx';
import LoggedInUser from './pages/LoggedInUser.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<LoggedInUser />} />
            <Route path="/applicants" element={<ListApplicants />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;