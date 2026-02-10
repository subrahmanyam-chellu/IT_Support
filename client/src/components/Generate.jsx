import { Box, Button, Card, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CircularIndeterminate from '/src/components/CircularIndeterminate';


const Generate = () => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const greetingRegex = /\b(hi|hello|hey|greetings|good\s(morning|afternoon|evening)|yo|sup|howdy|what's up)\b/i;
    const token = localStorage.getItem("x-token");

    const validate = () => {
        if (greetingRegex.test(description)) {
            setError("make sure description is free from greeting");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (description.length < 15) {
            setError("Description must be at least 15 characters long.");
            return;
        }
        validate();
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
            if (response.status == 201) {
                alert(`Form submitted!\nTitle: ${title}\nDescription: ${description}`);
            }

        } catch (err) {
            setError(err.toString());

        }
        setLoading(false);
        window.location.reload();
    };

    useEffect(() => { validate(); }, [description]);

    return (
        <>
        {loading&&<CircularIndeterminate texts={"Generating....."}/>}
        <Box sx={{
            border: '3px solid cyan', borderRadius: '18px', p: { xs: '10px', md: '25px' },
            '&:hover': { boxShadow: '3px 3px 3px 3px cyan', transform: 'translateY(-5px)' }, ml: { md: '50px' }
        }}>
            <Box>
                <Typography sx={{ fontSize: { xs: 24, md: 40 }, fontWeight: 600, my: { xs: '25px', md: '30px' } }}>Create New Ticket</Typography>
                <Typography sx={{ fontSize: { xs: 12, md: 24 }, fontWeight: 200 }}>Please enter the title and description in rescpected fields.</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, borderRadius: '15px', width: { xs: '99%', md: '600px' } }}>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    fullWidth
                    label="description"
                    type="text"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    required
                    sx={{ mb: 4 }}
                />
                {
                    error &&
                    <Typography color='error' sx={{ textAlign: 'center', textTransform: 'none', my: '8px' }}>{error}</Typography>
                }
                <Button type="submit" fullWidth variant="contained" color='success' sx={{ textTransform: 'none', fontSize: 18, fontWeight: 500, borderRadius: '10px', mb: 4 }}>Register</Button>
            </Box>
        </Box>
        </>
    )
}

export default Generate
