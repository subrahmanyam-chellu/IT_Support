import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Typography from '@mui/material/Typography';
import About from '../../components/About';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularIndeterminate from '/src/components/CircularIndeterminate';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const [display, setDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name.length < 3 || !passwordRegex.test(password) || password !== verify) {
      setError(
        "Please ensure:\n - Name ≥ 3 characters\n - Password ≥ 8 chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol\n - Verify password matches"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        name,
        email,
        password
      });

      //alert(`Form submitted!\nName: ${name}\nEmail: ${email}`);
      setDisplay("Registration successfull");
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      {loading&&<CircularIndeterminate texts={"Registering...."}/>}
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
            Get Registered....
          </Typography>
        </Box>

        <form className="form" onSubmit={handleSubmit} style={{ width:{xs:'100%', md:'800px'}, margin: "auto" }}>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} />
          <TextField label="Password" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 2 }} />
          <TextField label="Verify Password" fullWidth type="password" value={verify} onChange={(e) => setVerify(e.target.value)} required sx={{ mb: 2 }} />

          {error && <Typography color="error" sx={{ mb: 2, whiteSpace: "pre-line" }}>{error}</Typography>}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="button" variant="contained" color="success" onClick={() => navigate('/login')}>Login</Button>
            {error && <Typography color="success" sx={{ mb: 2, whiteSpace: "pre-line" }}>{display}</Typography>}
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            
          </Box>
        </form>
        <About />
      </Box>
    </MainLayout>
  );
};

export default Register;