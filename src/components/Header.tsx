import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Attractions } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated, logout} from '../utils/auth';

function Header() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const updateAuth = () => {
      setAuth(isAuthenticated());
      console.log(auth);
    };

    updateAuth();

    //Listen to storage to check if the JWT token have been added or removed.
    window.addEventListener("storage", updateAuth);

    return () => {
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
