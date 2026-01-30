import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import Tickets from '../../components/Tickets'
import About from '../../components/About'
import Box from '@mui/material/Box'
import Back from '../../components/Back'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TicketsA from '../../components/TicketsA'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

const AllTickets = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [error, setError] = useState('');
    const [tickets, setTickets] = useState([]);
    const [counts, setCounts] = useState({})
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
                ticketsHandler();
                countsHandler();
            }
        }
    }, [navigate, TicketsA]);

    const ticketsHandler = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alltickets`,
                {
                    headers: { "x-token": token }
                }
            );
            if (response.status == 200) {
                if (response.data == null || response.data == []) {
                    setError("No tickets are available!");
                }
                setTickets(response.data.allTickets);
            }
        } catch (error) {
            if (error) {
                setError(error);
            }
            else {
                setError("we are facing some  error");
            }
        }
    }

    const countsHandler = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/counts`,
                {
                    headers: { "x-token": token }
                }
            );
            if (response.status == 200) {
                if (response.data == null || response.data == []) {
                    setError("No counts are available!");
                }
                setCounts(response.data);
            }
        } catch (error) {
            if (error) {
                setError(error);
            }
            else {
                setError("we are facing some  error");
            }
        }
    }

    const handleDeleteAll = async () => {
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

    const handleDelete = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const ticketId = formData.get("ticketId");
        try {
            if (confirm("are you wana delete ticket ?")) {
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

    return (
        <MainLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: { xs: '65px' } }}>
                <Box sx={{ display: 'flex', flexDirection:{xs:'column', md:'row'}, justifyContent: 'space-around', backgroundColor: '#a5aa90', mb: { xs: '25px' }, paddingY: { xs: '25px' } }}>
                    <Card>
                        <CardContent sx={{ backgroundColor: 'black' }}>
                            <Typography variant='h4' color='pink'>Total Tickets</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='h2' color='white'>{counts.allCount}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Divider/>
                    <Card>
                        <CardContent sx={{ backgroundColor: 'black' }}>
                            <Typography variant='h4' color='error'>Pending Tickets</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='h2' color='white'>{counts.pCount}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Divider/>
                    <Card>
                        <CardContent sx={{ backgroundColor: 'black' }}>
                            <Typography variant='h4' color='yellowgreen'>Resolved Tickets</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='h2' color='white'>{counts.rCount}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <TicketsA tickets={tickets} />
                {/* <Typography variant='h6' color='error'>{error}</Typography> */}
                <Box sx={{ my: { xs: '25px' } }}>
                    <Button variant='contained' color='secondary' onClick={() => navigate('/home')}>Home</Button>
                </Box>
                <form onSubmit={handleDelete}>
                    <Box sx={{ maxWidth: '800px' }}>
                        <TextField label='TicketId' name='ticketId' fullWidth />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: { xs: 'space-between', md: 'flex-start' }, minWidth: '400px', mb: '25px' }}>
                        <Button variant='contained' color='error' onClick={handleDeleteAll} sx={{ my: '15px' }}>Delete Resolved tickets</Button>
                        <Button variant='contained' type='submit' color='secondary' sx={{ my: '15px', ml: { md: '380px' } }}>Delete Entered ticket</Button>
                    </Box>
                </form>
                <About />
            </Box>
        </MainLayout>
    )
}

export default AllTickets
