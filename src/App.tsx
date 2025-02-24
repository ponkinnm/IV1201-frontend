import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';
import ListApplicants from './pages/ListApplicants.tsx';
import ViewApplicant from './pages/ApplicationDetails.tsx'; 
import LoggedInUser from './pages/LoggedInUser.tsx';
import { theme } from './theme/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/applicants" element={<ListApplicants />}></Route>
          <Route path="/applicants/:application_id" element={<ViewApplicant />} />
          <Route path="/user" element={<LoggedInUser />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
