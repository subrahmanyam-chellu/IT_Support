import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import '/src/pages/user/User.css';
import { useNavigate } from 'react-router-dom';

const Menu = ({section, setSection }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("x-token");
      navigate('/');

    };

    return (
        <Box sx={{ display:'flex', mr: {xs:'', md: '50px' }, justifyContent: { xs: 'space-evenly', md: 'space-around' }, alignItems: { xs: 'center' }, my:{xs:'35px', md:'0px'} }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    justifyContent: { xs: 'space-around', md: 'space-around' },
                    alignItems: 'center',
                    border: '2px solid grey',
                    borderRadius: '15px',
                    boxShadow: { xs: '0px 2px 2px 2px grey ', md: '3px 3px 5px 5px grey' },
                    height: {xs:'55px', md: '97vh' },
                    my:{xs:'0px', md:'5px'},
                    width: { xs: '97%' },
                    position:{xs:'fixed', sm:'sticky'},
                    background:{xs:'black', sm:'linear-gradient(45deg, #c3840ecc, #b2be2fb4)'},
                    zIndex:'2'
                }}
            >
                <Typography sx={{display:{xs:'none', md:'block'}, fontSize:{md:40}, fontWeight:{md:600}}}>Menu</Typography>
                <Button variant='contained'sx={{width:{xs:'5.5rem', md:'250px'}, height:{md:'60px'}, fontSize:{md:'large'}, border:'2px solid black', textTransform:'none', borderRadius:'15px',
                                                 background:section==1?'linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))':'none'}}  onClick={() => setSection(1)}>
                    Dashboard
                </Button>
                <Button variant='contained' sx={{width:{xs:'5.5rem', md:'250px'}, height:{md:'60px'}, fontSize:{md:'larger'}, border:'2px solid black',textTransform:'none', borderRadius:'15px',
                                                 background:section==2?'linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))':'none' }} onClick={() => setSection(2)}>
                    Tickets
                </Button>
                <Button variant='contained' sx={{width:{xs:'5.5rem', md:'250px'}, height:{md:'60px'}, fontSize:{md:'larger'}, border:'2px solid black', textTransform:'none', borderRadius:'15px',
                                                 background:section==3?'linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))':'none'}} onClick={() => setSection(3)}>
                    Profile
                </Button>
                <Divider sx={{ my: 1 }} />
                <Button variant='contained' type='button' sx={{width:{xs:'5.5rem', md:'250px'}, height:{md:'60px'}, fontSize:{md:'larger'}, border:'2px solid black'}} className='lauchbtn' onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Menu;