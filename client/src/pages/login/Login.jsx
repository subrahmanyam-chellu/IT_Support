import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Typography from '@mui/material/Typography';
import About from '../../components/About';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {setUser} = useContext(AuthContext);
    
    useEffect(()=>{
        const token = localStorage.getItem("x-token");
    if(token){
        const decode = jwtDecode(token);
        if(decode.exp*1000>Date.now()){
            navigate('/home');
        }
    }
    }, [navigate]);

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
                {
                    email,
                    password
                }
            );
            if(response.status===200){
                 setUser(response.data.user);
                 localStorage.setItem("x-token", response.data.token);
                 navigate("/home");
            }
            else{
                setError("invalid credentials");
            }
        }catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
        
    };

    return (
        <MainLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
                        Hey hai! please Login...
                    </Typography>
                </Box>

                <form className="form" onSubmit={handleLogin} style={{ minWidth: "400px", maxWidth: "800px", margin: "auto" }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
                    {error && <Typography color="error" sx={{ mb: 2, whiteSpace: "pre-line" }}>{error}</Typography>}
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant="contained" color="success" onClick={()=>navigate('/Register')}>
                            Register
                        </Button>
                        <Button variant="contained" color="secondary" onClick={()=>navigate('/')}>
                            Back
                        </Button>              
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </form>
                <About />
            </Box>
        </MainLayout>
    );
};

export default Login;