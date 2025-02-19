import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container} from '@mui/material';
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';
import ListApplicants from './pages/ListApplicants.tsx';
import LoggedInUser from './pages/LoggedInUser.tsx';
import Application from './pages/Application.tsx';

/**
 * Routes to the following views:
 * "/" - Home page
 * "/applicants" - Lists all applications
 * "/user" - Landing page for authenticated users
 * "/apply" - Application form to submit a new work application
 * "*" - 404 Not found page
 * 
 * @returns App
 */
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container sx={{ marginTop: '64px', paddingBottom: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/applicants" element={<ListApplicants />}></Route>
            <Route path="/user" element={<LoggedInUser />}></Route>
            <Route path="/apply" element={<Application />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
