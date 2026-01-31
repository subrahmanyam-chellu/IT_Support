import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Tickets from '../../components/Tickets'
import About from '../../components/About'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import CircularIndeterminate from '/src/components/CircularIndeterminate';

const MyTickets = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState();
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
                ticketsHandler();
            }
        }
    }, [navigate]);

    const ticketsHandler = async()=>{
        setLoading(true);
        try{
             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettickets`,
                                              { 
                                                headers: { "x-token": token }
                                              }
             );
             if(response.status==200){
                if(response.data==null||response.data==[]){
                    setError("No tickets are available!");
                }
                setTickets(response.data.tickets);
             }
             else{
                setError("no data found");
             }
        }catch(error){
            if(error){
                setError(error.toString());
            }
            else{
                setError("we are facing some  error");
            }
        }
        setLoading(false);
    }
    return (
        <MainLayout>
            {loading&&<CircularIndeterminate texts={"Loading tickets..."}/>}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', height: '100vh', mt: { xs: '65px' } }}>
                <Typography variant='h4' color='success'> Yours tickets....</Typography>
                <Tickets tickets={tickets} />
                <Typography variant='h6' color='error'>{error}</Typography>
                <Box sx={{ my: { xs: '25px' } }}>
                    <Button variant='contained' color='secondary' onClick={()=>navigate('/home')}>Home</Button>
                </Box>
                <About />
            </Box>
        </MainLayout>
    )
}

export default MyTickets
