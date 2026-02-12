import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import Greeting from '../../components/Greeting';
import Generate from '../../components/Generate';
import TicketsA from '../../components/TicketsA';
import { Box } from '@mui/material';
import Profile from '../../components/Profile';
import Counts from '../../components/Counts';
import Delete from '../../components/Delete';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import CircularIndeterminate from '/src/components/CircularIndeterminate';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';


const Admin = () => {

    const [section, setSection] = useState(1);
    const [tickets, setTickets] = useState([false,""]);
    const [counts, setCounts] = useState({ allCount: '0', pCount: '0', rCount: '0' });
    const [loading, setLoading] = useState([false, "Loading..."]);
    const [error, setError] = useState();
    const [users, setUsers] = useState();
    const [isModelOn, setIsModelOn] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem("x-token");

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        } else {
            const decode = jwtDecode(token);
            if (decode.exp * 1000 < Date.now()) {
                localStorage.removeItem("x-token");
                navigate('/auth');
            } else {
                if (decode.user.role.toLowerCase() !== 'admin') {
                    navigate('/auth');
                }
                setUsers(decode.user);
                callModel();
                ticketsHandler();
                countsHandler();

            }
        }
    }, [TicketsA, isModelOn]);

    const handleSection = (Num) => {
        setSection(Num);
    }

    const ticketsHandler = async () => {
        setLoading([true, 'Loading tickets...']);
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
        setLoading([false, 'Loading tickets...']);
    }

    const countsHandler = async () => {
        setLoading([true, 'Loading counts...']);
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
        setLoading([false, 'Loading tickets...']);
    }

    const callModel = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/model`);
        if (response.status == 200) {
            setIsModelOn(true);
        } else {
            setIsModelOn(false);
        }
    }

    return (
        <>
        {(loading[0])?(<Box sx={{display:'flex', width:'100%', height:'100vh', alignItems:'center', justifyContent:'center'}}><CircularIndeterminate texts={loading[1]} /></Box>):(
            <Box sx={{ backgroundColor: 'beige' }}>
            <Box sx={{ width: '100%', backgroundColor: 'beige', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Box sx={{ width: { xs: '100%', md: '350px' }}}>
                        <Menu section={section} setSection={handleSection} />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '800px' }, display: 'flex', flexDirection: 'column', justifyContent: { xs: 'center' } }}>
                        <Box sx={{ ml: { xs: '1rem', md: '0rem' } }}>
                            <Greeting name={users?.name} aiStatus={isModelOn} />
                        </Box>
                        {section == 1 &&
                            <>
                                <Counts counts={counts} />
                                <Delete token={token} />
                            </>
                        }
                        {
                            section == 2 &&
                            <TicketsA tickets={tickets} />
                        }
                        {
                            section == 3 &&
                            <Profile users={users} />
                        }
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: { sm: 'none' }, mt:'15px' }}>
                <Footer />
            </Box>
        </Box>

        )};
        </>
        
    )
}

export default Admin
