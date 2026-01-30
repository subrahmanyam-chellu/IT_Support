import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import topImage from '/src/assets/2.jpg';
import Typography from '@mui/material/Typography';
import MainLayout from '../../layouts/MainLayout';
import Button from '@mui/material/Button';
import About from '../../components/About';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("x-token");
        if (!token) {
            navigate('/login');
        } else {
            const decode = jwtDecode(token);
            if (decode.exp * 1000 < Date.now()) {
                localStorage.removeItem("x-token");
                navigate('/login');
            } else {
                setUsers(decode);
            }
        }
    }, [navigate]);
    return (
        <MainLayout>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100vh'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs:'90px', md: '45px' } }}>
                    <Typography sx={{ fontFamily: 'ui-rounded', fontSize: { xs: '24px', md: '48px' }, color: 'hsla(284, 94%, 60%, 0.79)', fontWeight: 'bolder', mb: { xs: '10px', md: '15px' } }}>Welcome to Home....</Typography>
                </Box>

                <Box
                    component="img"
                    src={topImage}
                    alt="AI illustration 1"
                    sx={{ width: '100%', maxHeight: 550, objectFit: 'cover', mb: '25px' }}
                />
                <Box sx={{ mb: { xs: '25px' } }}>
                    <Typography sx={{ fontFamily: 'ui-rounded', fontSize: { xs: '24px', md: '48px' }, color: 'hsla(239, 92%, 54%, 0.79)', fontWeight: 'bolder', m: { xs: '10px', md: '15px' } }}>Let's get started</Typography>
                    <Button variant='contained' sx={{ height: { xs: '40px', md: '80px' }, width: { xs: '100px', md: '225px' }, borderRadius: '15px', fontSize: { xs: '1.5rem', md: '2.5rem' } }} color='success' onClick={() => navigate('/generate')}>Go....</Button>
                </Box>
                <About />
            </Box>

        </MainLayout>
    )
}

export default Home;
