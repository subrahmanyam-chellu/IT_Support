import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainLayout from '../../layouts/MainLayout';

import topImage from '/src/assets/1.jpg';
import secondImage from '/src/assets/3.jpg';
import Button from '@mui/material/Button';
import About from '../../components/About';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Landingpage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("x-token");
    if (token) {
        const decode = jwtDecode(token.toString());
        if (decode.exp * 1000 < Date.now()) {
            navigate('/home');
        }
    }
    return (
        <MainLayout>
            <Box sx={{ backgroundColor: 'hsl(75, 57%, 97%)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: { xs: '45px' } }}>
                    <Typography sx={{ fontFamily: 'ui-rounded', fontSize: { xs: '24px', md: '48px' }, color: 'hsla(284, 94%, 60%, 0.79)', fontWeight: 'bolder', m: { xs: '10px', md: '15px' } }}>Welcome to Our AI‑Powered Support System</Typography>
                </Box>

                <Box
                    component="img"
                    src={topImage}
                    alt="AI illustration 1"
                    sx={{ width: '100%', maxHeight: 450, objectFit: 'cover', mb: 2 }}
                />
                <Box sx={{ my: { xs: '25px', md: '60px' } }}>
                    <Typography sx={{ fontSize: { xs: '24px', md: '36px' }, fontFamily: 'ui-rounded', color: 'hsl(225, 100%, 50%)', fontWeight: 'bolder', m: { xs: '10px', md: '15px' } }}>AI IT Support: Fix Issues Fast, No Hassle</Typography>
                    <Typography sx={{ fontFamily: 'sans-serif', fontSize: { xs: '14px', md: '24px' }, color: 'black', m: { xs: '10px', md: '15px' } }}>
                        Get IT help instantly—anytime, anywhere.<br />
                        Tired of waiting on hold or chasing emails? Our smart AI understands your problem, suggests fixes, and connects you to experts only when needed.<br />
                    </Typography>
                </Box>
                <Box sx={{ mb: { xs: '25px', md: '65px' } }}>
                    <Typography sx={{ fontSize: { xs: '24px', md: '36px' }, color: 'hsla(273, 55%, 33%, 0.90)', fontWeight: { xs: 'bolder' }, mb: { xs: '25px', sm: '65px' } }}>Try It Now – Free</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { md: 'space-evenly' } }}>
                        <Button variant='contained' color='primary' sx={{ width: { xs: '110px', md: '250px' }, height: { xs: '40px', md: '60px' }, fontFamily: 'ui-rounded', fontSize: { xs: '20px', md: '30px' }, border: '2px solid black', borderRadius: { xs: '25px', md: '25px' }, mb: '20px' }}
                            onClick={() => navigate('/login')}>Login</Button>
                        <Button variant='contained' color='success' sx={{ width: { xs: '110px', md: '250px' }, height: { xs: '40px', md: '60px' }, fontFamily: 'ui-rounded', fontSize: { xs: '20px', md: '30px' }, border: '2px solid black', borderRadius: { xs: '25px', md: '25px' } }}
                            onClick={() => navigate('/register')}>Register</Button>
                    </Box>
                </Box>
                <Box
                    component="img"
                    src={secondImage}
                    alt="AI illustration 2"
                    sx={{ width: '100%', maxHeight: 550, objectFit: 'cover', mb: { xs: '25px', sm: '65px' } }}
                />
            </Box>
            <About />
        </MainLayout>

    );
};

export default Landingpage;