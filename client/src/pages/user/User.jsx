import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import Greeting from '../../components/Greeting';
import Generate from '../../components/Generate';
import Tickets from '../../components/Tickets';
import { Box } from '@mui/material';
import Profile from '../../components/Profile';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CircularIndeterminate from '/src/components/CircularIndeterminate';
import { useNavigate } from 'react-router-dom';



const User = () => {
  const [section, setSection] = useState(1);
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [isModelOn, setIsModelOn] = useState();
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
        if(decode.user.role.toLowerCase()!=='user'){
          navigate('/auth');
        }
        setUsers(decode.user);
        callModel();
        ticketsHandler();
      }
    }
  }, []);
  
  const ticketsHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettickets`,
        {
          headers: { "x-token": token }
        }
      );
      if (response.status == 200) {
        if (response.data == null || response.data == []) {
          setError("No tickets are available!");
        }
        setTickets(response.data.tickets);
    
      }
      else {
        setError("no data found");
      }
    } catch (error) {
      if (error) {
        setError(error.toString());
      }
      else {
        setError("we are facing some  error");
      }
    }
    setLoading(false);
  }

  const handleSection = (Num) => {
    setSection(Num);
  }

  const callModel = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
    if(response.status==200){
      setIsModelOn(true);
    }else{
      setIsModelOn(false);
    }
  }

  return (
    <>
    {loading&&<CircularIndeterminate texts={"Loading tickets..."}/>}
    <Box sx={{ width: '100%', backgroundColor: 'beige', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
        <Box sx={{ width: { xs: '100%', md: '350px', m: { xs: '30px' } } }}>
          <Menu section={section} setSection={handleSection} />
        </Box>
        <Box sx={{ m: { xs: '35px', md: '0px' }, width: { xs: '320px', md: '1000px' } }}>
          <Greeting name={users.name} aiStatus={isModelOn} />
          {section == 1 &&
            <Generate />
          }
          {
            section == 2 &&
            <Tickets tickets={tickets}/>
            
          }
          {
            section == 3 &&
            <Profile users={users}/>
          }
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default User
