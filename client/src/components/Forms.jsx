import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from '/src/components/CircularIndeterminate';

const Forms = ({ isLogin, setIsLogin, isRegister, setIsRegister }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState('');
    const [errorL, setErrorL] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const toggleLogin = () => {
        setIsLogin(true);
        setIsRegister(false);
    }

    const toggleRegister = () => {
        setIsLogin(false);
        setIsRegister(true);
    }

    const validate = () => {
        if (name.length < 3) {
            setError("Name must contain atleast 3 characters");
        }
        else if (!password.match(passwordRegex)) {
            setError("Password must contain atleast 8 characters, 1-UpperCase, LowerCase, Numerical, Symbol");
        }
        else if (password != repassword) {
            setError("both password should be same");
        }
        else if(password == repassword){
            setError("");
        }
    }

    const handleRegister = async (e) => {
         e.preventDefault();
         setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { name, email, password });
            if (response.status === 200) {
                alert("Registered successfully.");
                setLoading(false);
                navigate('/auth');
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
         e.preventDefault();
         setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password });
            if (response.status === 200) {
                localStorage.setItem("x-token", response.data.token);
                setLoading(false);
                if(response.data.user.role.toLowerCase()==='admin'){
                    navigate('/admin');
                }else{
                    navigate('/user');
                }
                
            }
        } catch (err) {
            setErrorL("Login failed. Please check your credentials.");
            setLoading(false);
        }
    };

    useEffect(() => { validate(); }, [name, email, password, repassword]);

    return (
        <>
        {loading &&<CircularIndeterminate texts='Loading...'/>}
        <Box sx={{ justifySelf: 'center', border: '2px solid cyan', borderRadius: '15px', p: 2, justifyContent: 'center', '&:hover':{boxShadow: '3px 3px 13px 13px #7db8c2',transform: 'translateY(-5px)'} }}>
            <Box sx={{ width: '95%', display: 'flex', justifyContent: 'space-between', my: 3, p: 1, border: '2px solid cyan', borderRadius: '15px' }}>
                <Button
                    variant={isRegister ? "contained" : "outlined"}
                    onClick={()=>{toggleRegister(); validate();}}
                    sx={{
                        flex: 1,
                        border: '0px',
                        background: isRegister
                            ? "linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))"
                            : "none", borderRadius: '10px'
                    }}
                >
                    Register
                </Button>
                <Button
                    variant={isLogin ? "contained" : "outlined"}
                    onClick={() => { toggleLogin(); setError("") }}
                    sx={{
                        flex: 1,
                        border: '0px',
                        background: isLogin
                            ? "linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))"
                            : "none", borderRadius: '10px'
                    }}
                >
                    Login
                </Button>
            </Box>


            {/* Forms */}
            {isRegister && (
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 3, borderRadius: '15px' }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Re-enter Password"
                        name="repassword"
                        type="password"
                        value={repassword}
                        onChange={(e) => { setRepassword(e.target.value) }}
                        required
                        sx={{ mb: 3 }}
                    />
                    {
                        error &&
                        <Typography color='error' sx={{ textAlign: 'center', textTransform: 'none', my: '8px' }}>{error}</Typography>
                    }
                    <Button type="submit" fullWidth variant="contained" color='success' sx={{ textTransform: 'none', fontSize: 18, fontWeight: 500, borderRadius: '10px' }} onClick={() => { handleRegister(); }}>Register</Button>
                </Box>
            )}

            {isLogin && (
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, borderRadius: '15px' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                        sx={{ mb: 3 }}
                    />
                    {
                        error&&
                        <Typography color='error' sx={{textAlign:'center', textTransform:'none', my:'8px'}}>{errorL}</Typography>
                    } 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="button" variant="text" sx={{ textTransform: 'none', fontSize: 12, fontWeight: 500 }}>Forgot Password</Button>
                        <Button type="submit" variant="contained" color='success' sx={{ textTransform: 'none', fontSize: 18, fontWeight: 500, borderRadius: '10px' }} onClick={() => { handleLogin(); }}>Login</Button>
                    </Box>
                </Box>
            )}
        </Box>
        </>
    )
}

export default Forms
