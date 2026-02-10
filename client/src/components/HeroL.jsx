import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { keyframes } from '@emotion/react'

const HeroL = ({model}) => {

 const pulse = keyframes`0%{transform:scale(1)} 30%{transform:scale(1.2)} 60%{transform:scale(1.4)} 80%{transform:scale(1.2) 100%{transform:scale(1)}`;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: '#e8dcb381' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '380px', md: '800px' }, mx: { xs: '10px', md: '352px' } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mt: { md: '75px' } }}>
          {model&&<Typography color='success' sx={{fontSize:{xs:14, md:18}, mt:{xs:2, md:3}, textAlign:'center', animation:`${pulse} 2s infinite`}}>AI model is connected.</Typography>}
          {!model&&<Typography color='error' sx={{fontSize:{xs:14, md:18}, mt:{xs:2, md:3}, textAlign:'center', animation:`${pulse} 2s infinite`}}>Connecting to AI mode....</Typography>}
          <Typography sx={{ fontSize: { xs: 60, md: 95 }, fontWeight: 600 }}>Intelligent</Typography>
          <Typography sx={{ fontSize: { xs: 60, md: 95 }, fontWeight: 600 }}>Support</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', my: { md: '15px' } }}>
          <Typography sx={{
            background: "linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: 60, md: 95 }, fontWeight: '600',
          }}>Powered by</Typography>
          <Typography sx={{
            background: "linear-gradient(to left, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: 60, md: 95 }, fontWeight: 600, ml: { md: '20px' }
          }}>AI</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'ui-sans-serif', fontSize: { xs: 20, md: 30 } }}>Transform your helpdesk with our AI-powered architecture that intelligently categorizes, prioritizes, and routes support tickets in real-time.</Typography>
        </Box>
        <Box>
          <Button variant='contained' sx={{
            width: { xs: '150px', md: '220px' }, height: { xs: '40px', md: '50px' }, textTransform: 'none',
            fontSize: {xs:14, md:18}, fontWeight: 790, my: { xs: '25px', md: '45px' }, background: "linear-gradient(to right, rgba(102, 0, 255, 0.59), rgba(0, 149, 255, 0.77))",
            borderRadius: { xs: '', md: '45px' }
          }}>Get Started Free </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default HeroL
