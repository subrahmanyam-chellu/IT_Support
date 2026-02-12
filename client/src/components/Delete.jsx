import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';

const Delete = ({token}) => {

    const [ticketId, setTicketId] = useState();

    const deleteHandle = async(id) => {

        try {
            if (confirm(`Are you sure to delete ${id}`)) {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${ticketId}`,
                    {
                        headers: {
                            "x-token": token
                        }
                    });
                if (response.status == 200) {
                    alert("deleted successfully");
                }
                window.location.reload();
            }
        } catch (err) {
            alert("deletion is failed");
        }

    }

    const deleteAllHandle = async() => {

        try {
            if (confirm("are you wana delete all resolved tickets ?")) {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteall`,
                    {
                        headers: {
                            "x-token": token
                        }
                    });
                if (response.status == 200) {
                    alert("deleted successfully");
                }
            }
        } catch (err) {
            alert("deletion is failed");
        }

    }

    return (
        <Box sx={{ml:{xs:'1rem', sm:'none'}}}>
            <Typography color='error' sx={{ fontSize: { xs: 24, md: 35 }, fontWeight: 600, mb: '15px' }}>Delete Tickets using below</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { md: 'space-between' }, alignItems: { xs: 'flex-start', md: 'center' }, mb: '20px' }}>
                <TextField label='Ticket-ID' required sx={{ width: { xs: '320px', md: '550px' }, mb: '15px' }} onChange={(e) => { setTicketId(e.target.value) }}></TextField>
                <Button variant='contained' sx={{
                    width: { md: '180px' }, height: { md: '55px' }, fontSize: { xs: '18px', md: 30 }, fontWeight: 600,
                    textTransform: 'none', backgroundColor: '#af462b', borderRadius: '25px'
                }} onClick={() => { deleteHandle(ticketId); }}>Delete</Button>
            </Box>
            <Button variant='contained' sx={{
                width: { md: '260px' }, height: { md: '55px' }, fontSize: { xs: '16px', md: 26 }, fontWeight: 600,
                textTransform: 'none', backgroundColor: 'red', borderRadius: '25px'
            }} onClick={() => { deleteAllHandle(); }}>Delete resolved</Button>
        </Box>
    )
}

export default Delete
