import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import Profile from '/src/pages/profile/Profile';
import {useNavigate} from 'react-router-dom';

export default function AAppBar({onMenuClick}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("x-token");

  const handleProfile = ()=>{
    if(!token==undefined||token){
      navigate('/profile');
    }else{
      navigate('/login');
    }
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Support
          </Typography>
          <IconButton color="inherit">
            <PersonIcon onClick={handleProfile} style={{ cursor: 'pointer' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
