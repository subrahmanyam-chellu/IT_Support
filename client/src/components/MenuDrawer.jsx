import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LoginIcon from '@mui/icons-material/Login';
import GeneratingTokensIcon from '@mui/icons-material/GeneratingTokens';
import HomeIcon from '@mui/icons-material/Home';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function MenuDrawer({ open, onClose }) {
  const fields = [{ lable: "Home", icon: <HomeIcon fontSize='large' />, path:'/home' },
  { lable: "Generate Ticket", icon: <GeneratingTokensIcon fontSize='large' />, path:'/generate' },
  { lable: "My Tickets", icon: <ConfirmationNumberIcon fontSize='large' />, path:'/mytickets' },
  { lable: "Login", icon: <LoginIcon fontSize='large'/>, path:'/login' }
  ];

  const navigate = useNavigate();


  const list = (anchor) => (
    <Box>
      <ListItemButton sx={{mb:{lg:'40px'}}}>
        <ListItemIcon sx={{ color: 'black', ml: { xs: '210px', md: '335px' } }}>
          <CloseRoundedIcon  onClick={()=>{onClose();}} fontSize='large'/>
        </ListItemIcon>
        <Divider />
      </ListItemButton>
      <List>
        {fields.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ m:{xs:'20px', sm:'25px'}}} onClick={()=>navigate(item.path)}>
              <ListItemIcon sx={{color:'black'}}>
                {item.icon}
              </ListItemIcon>
              {/* <ListItemText primary={item.lable} sx={{ fontSize: '18px', color: 'black', fontWeight: 600 }} /> */}
              <Typography sx={{fontSize:'20px', fontWeight:'bolder'}}>{item.lable}</Typography>
              <Divider />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        slotProps={{
          paper: {
            sx: {
              width: { xs: 280, md: 400 }, display: 'flex', flexDirection: 'column',
              border: '2px solid black', borderRadius: '10px'
            }
          }
        }}

        open={open}
        onClose={onClose}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
