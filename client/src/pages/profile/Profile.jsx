import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Typography from '@mui/material/Typography';
import About from '../../components/About';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
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
                setUsers(decode.user);
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("x-token");
        navigate('/login');
    };

    return (
        <MainLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
                <Box sx={{ my: { xs: '35px' } }}>
                    <Typography
                        sx={{
                            fontFamily: 'ui-rounded',
                            fontSize: { xs: '24px', md: '48px' },
                            color: 'hsla(284, 94%, 60%, 0.79)',
                            fontWeight: 'bolder',
                            my: { xs: '10px', md: '15px' }
                        }}
                    >
                        Your profile info....
                    </Typography>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: '400px', my: { xs: '25px' }, backgroundColor:'black' }}>
                            <CardContent>
                                <Typography sx={{fontSize:'18px', color:'yellowgreen'}}>Id: {users?._id}</Typography>
                                <Divider />
                                <Typography sx={{fontSize:'18px', color:'yellowgreen'}}>Name: {users?.name}</Typography>
                                <Divider />
                                <Typography sx={{fontSize:'18px', color:'yellowgreen'}}>Email: {users?.email}</Typography>
                                <Divider />
                                <Typography sx={{fontSize:'18px', color:'yellowgreen'}}>Role: {users?.role}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', my:'15px' }}>
                                    <Button variant="contained" color="success" onClick={() => navigate('/home')}>
                                        Back
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                    {users.role == 'admin' && (
                                        <Button variant="contained" color="primary" onClick={() => navigate('/alltickets')}>
                                            View all tickets
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <About />
            </Box>
        </MainLayout>
    );
};

export default Profile;