import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const HeroL = ({ model }) => {

  const navigate = useNavigate();
  const pulse = keyframes`0%{transform:scale(1)} 30%{transform:scale(1.2)} 60%{transform:scale(1.4)} 80%{transform:scale(1.2) 100%{transform:scale(1)}`;

  const handle = () => {
    navigate('/auth');
  }

  return (
    <Box sx={{ width: '100%', heigth:'100%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', backgroundColor: '#e8dcb381', py: { xs: '25px', md: '25px' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', mx: {md: '310px' } }}>
        <Box>
          {model && <Typography color='success' sx={{ fontSize: { xs: 14, md: 18 }, textAlign: 'center', animation: `${pulse} 2s infinite` }}>AI model is connected.</Typography>}
          {!model && <Typography color='error' sx={{ fontSize: { xs: 14, md: 18 }, textAlign: 'center', animation: `${pulse} 2s infinite` }}>Connecting to AI mode....</Typography>}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mt: { md: '25px' } }}>
          <Typography sx={{ fontSize: { xs: 60, md: 95 }, fontWeight: 600, textAlign:'center' }}>Intelligent Support</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{
            background: "linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: 55, md: 95 }, fontWeight: '600', textAlign:'center'
          }}>Powered by AI</Typography>
        </Box>
        <Typography sx={{ fontFamily: 'ui-sans-serif', fontSize: { xs: 20, md: 30 }, textAlign: 'center', mt:'15px' }}>Transform your helpdesk with our AI-powered architecture that intelligently categorizes, prioritizes, and routes support tickets in real-time.</Typography>
        <Button variant='contained' sx={{
          width: { xs: '150px', md: '220px' }, height: { xs: '40px', md: '50px' }, textTransform: 'none',
          fontSize: { xs: 14, md: 18 }, fontWeight: 790, background: "linear-gradient(to right, rgba(102, 0, 255, 0.59), rgba(0, 149, 255, 0.77))",
          borderRadius: { xs: '15px', md: '45px' }, mt:'20px', alignSelf:'flex-start', ml:{xs:'10px', md:'0px'}
        }} onClick={handle}>Get Started Free </Button>
      </Box>
    </Box>
  )
}

export default HeroL
