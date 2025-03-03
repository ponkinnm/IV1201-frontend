import { AppBar, Box, Toolbar, Typography, FormControl, Select, MenuItem} from '@mui/material';
import { Attractions } from '@mui/icons-material';
import { Link} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageIcon from '@mui/icons-material/Language';

function Header() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en"); //Use english as default language


  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100dvw' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Attractions htmlColor="white" fontSize={'large'} />
            <Typography color="white" component="div" variant="h6">
              Theme park careers
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
        <LanguageIcon sx={{ alignSelf: "center", margin: 1 }}/>
          <FormControl>
                <Select
                  id={"language"}
                  name={"language_selector"}
                  value={language}
                  IconComponent={ArrowDropDownIcon}
                  onChange={(event) => {
                    if(event !== null){
                      setLanguage(event.target.value)
                      changeLanguage(event.target.value);
                    }
                  }}
                  sx={{
                    backgroundColor: "white",
                    width: 100
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="sv">Svenska</MenuItem>
                </Select>
              </FormControl>
            </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;