import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { keyframes } from '@mui/material';

const Greeting = ({name, aiStatus}) => {
  const [greet, setGreet] = useState({ greet: "Good Morning", color: "#000" });
  const pulse = keyframes`0%{transform:scale(1)} 30%{transform:scale(1.2)} 60%{transform:scale(1.4)} 80%{transform:scale(1.2) 100%{transform:scale(1)}`;

  const greetSetter = () => {
    const time = new Date();
    const hours = time.getHours();

    if (hours < 12) {
      setGreet({ greet: "Good Morning🌄! ", color: "#fd2b2be1" });
    } else if (hours >= 12 && hours < 16) {
      setGreet({ greet: "Good Afternoon☀️! ", color: "#df7474e1" });
    } else if (hours >= 16 && hours < 20) {
      setGreet({ greet: "Good Evening🌇! ", color: "#fd2b2be1" });
    } else {
      setGreet({ greet: "Good Night🌛! ", color: "#193ea5" });
    }
  };

  useEffect(() => {
    greetSetter();
  }, []);

  return (
    <Box sx={{ width:{xs:'320px', md:'1000px'}, borderRadius: '15px', my:{xs:'15px', md:'15px'}, backgroundColor: 'blanchedalmond' }}>
      <Typography
        sx={{
          color: greet.color,
          textAlign: 'left',
          fontSize: { xs: 24, md: 60 },
          fontWeight: 600,
        }}
      >
        {greet.greet}{name}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 14, md: 24 },
          fontWeight: 400,
          my: { xs: '15px', md: '30px' },
          textAlign:'left',
        }}
      >
        Welcome back to your dashboard
      </Typography>
      {aiStatus&&<Typography color='success' sx={{fontSize:{xs:14, md:18}, textAlign:'center', animation:`${pulse} 2s infinite`}}>AI connected.</Typography>}
      {!aiStatus&&<Typography color='error' sx={{fontSize:{xs:14, md:18}, textAlign:'center', animation:`${pulse} 2s infinite`}}>connecting to AI...</Typography>}
    </Box>
  );
};

export default Greeting;