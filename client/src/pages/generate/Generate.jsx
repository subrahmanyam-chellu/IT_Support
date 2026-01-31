import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Typography from '@mui/material/Typography';
import About from '../../components/About';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Generate.css';
import Back from '/src/components/Back';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import CircularIndeterminate from '/src/components/CircularIndeterminate';

const Generate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("x-token");

  useEffect(() => {

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (description.length < 15) {
      setError("Description must be at least 15 characters long.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createticket`, {
        title: title,
        description: description
      }, {
        headers: {
          "x-token": token
        }
      });
      if (response.status == 200) {
        alert(`Form submitted!\nTitle: ${title}\nDescription: ${description}`);
      }

    } catch (err) {
      setError(err.toString());

    }
    setLoading(false);
  };

  return (
    <MainLayout >
      {loading&&<CircularIndeterminate texts={"Generating....."}/>}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ my: { xs: '35px' } }}>
          <Typography
            sx={{
              fontFamily: 'ui-rounded',
              fontSize: { xs: '24px', md: '48px' },
              color: 'hsla(284, 94%, 60%, 0.79)',
              fontWeight: 'bolder',
              mt: { xs: '45px', md: '15px' }
            }}
          >
            Generate Ticket....
          </Typography>
        </Box>

        <form className="form" onSubmit={handleSubmit} style={{width:{xs:'100%', md:'800px'} , margin: "auto" }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' color='secondary' onClick={() => navigate('/home')}>Home</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>

        <About />
      </Box>
    </MainLayout>
  );
};

export default Generate;