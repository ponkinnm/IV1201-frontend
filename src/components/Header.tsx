/**
 * Header used globally for all pages.
 * Includes the websites name and logo.
 * A log out button is added to the header when a user is logged in.
 **/
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Attractions } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated, logout} from '../utils/auth';

/**
 * Create a header for the website. 
 * A log out button is conditionally rendered based on if the user is logged in or not.
 * 
 * @returns Header
 **/
function Header() {
  //Keep track of if the user is logged in and if the log out button should be rendered (renders if auth is true).
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const updateAuth = () => {
      //Check if the user is authenticated and update the hook.
      setAuth(isAuthenticated());
    };

    //Check if the user is authenticated.
    updateAuth();

    //Listen to storage to check if the JWT token have been added or removed.
    window.addEventListener("storage", updateAuth);

    return () => {
      //Remove the event listener when it is not needed anymore.
      window.removeEventListener("storage", updateAuth);
    };

  }, []);

  return (
    <AppBar position="sticky" sx={{ width: "100d%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width:"100%"}}>
        <Link to="/">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Attractions htmlColor="white" fontSize={"large"} />
            <Typography color="white" component="div" variant="h6">
              Theme park careers
            </Typography>
          </Box>
        </Link>
        <Link to="/">
          {auth && (
            <Button 
              sx={{ ml: "auto", color: "blue", backgroundColor: "white", fontWeight: "bold", "&:hover": {backgroundColor: "lightgray"}}}
              color="secondary" 
              onClick={()=>{logout(); setAuth(false)}}
            >Log out</Button>
          )}
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
