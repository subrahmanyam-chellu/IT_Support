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


const Admin = () => {

    const [section, setSection] = useState(1);
    const [tickets, setTickets] = useState([]);
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
                if(decode.user.role.toLowerCase()!=='admin'){
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
            {loading[0] && <CircularIndeterminate texts={loading[1]} />}
            <Box sx={{ width: '100%', backgroundColor: 'beige', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
                    <Box sx={{ width: { xs: '100%', md: '350px', m: { xs: '30px' } } }}>
                        <Menu section={section} setSection={handleSection} />
                    </Box>
                    <Box sx={{ m: { xs: '35px', md: '0px' }, width: { xs: '320px', md: '800px' } }}>
                        <Greeting name={users?.name} aiStatus={isModelOn} />
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
        </>
    )
}

export default Admin
