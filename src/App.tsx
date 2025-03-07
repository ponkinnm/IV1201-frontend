import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';
import ListApplicants from './pages/ListApplicants.tsx';
import ViewApplicant from './pages/ViewApplicant.tsx'; 
import LoggedInUser from './pages/LoggedInUser.tsx';
import Application from './pages/Application.tsx';
import { theme } from './theme/theme.ts';
import SignUp from './pages/SignUp.tsx';
import './i18n';
import PrivateRoute from './components/PrivateRoute.tsx'; // Import PrivateRoute
import PublicRoute from "./components/PublicRoute";
/**
 * Routes to the following views:
 * "/" - Home page
 * "/applicants" - Lists all applications
 * "/user" - Landing page for authenticated users
 * "/apply" - Application form to submit a new work application
 * "*" - 404 Not found page
 */
function App() {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Header />
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "64px", height: "calc(100vh - 64px)", minWidth: "100vw", overflow: "auto" }}>
          <Routes>
            <Route path="/" element={<PublicRoute><HomePage /></PublicRoute> }></Route>
            <Route path="/applicants" element={<PrivateRoute allowedRoles={[1]}><ListApplicants /></PrivateRoute>} />
            <Route path="/applicants/:application_id" element={<PrivateRoute allowedRoles={[1]}><ViewApplicant /></PrivateRoute>} />
            <Route path="/user" element={<PrivateRoute allowedRoles={[1, 2]}><LoggedInUser /></PrivateRoute>} />
            <Route path="/apply" element={<PrivateRoute allowedRoles={[1, 2]}><Application /></PrivateRoute>} />
            <Route path ="/signup" element={<PublicRoute><SignUp /></PublicRoute> }></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
