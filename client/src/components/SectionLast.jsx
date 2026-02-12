import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const SectionLast = () => {

  const navigate = useNavigate();
  
  const handle = () => {
    navigate('/auth');
  }

  return (
    <Box sx={{ width: '100%', heigth:'100%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', backgroundColor: '#e8dcb381', py: { xs: '75px', md: '25px' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', mx: {md: '310px' } }}>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mt: { md: '25px' } }}>
          <Typography sx={{ fontSize: { xs: 45, md: 95 }, fontWeight: 700, textAlign:'center' }}>Ready to transform your support?</Typography>
        </Box>
        <Typography sx={{ fontFamily: 'ui-sans-serif', fontSize: { xs: 20, md: 30 }, textAlign: 'center', mt:'15px' }}>Join hundreds of enterprises using AI to streamline their support operations and deliver exceptional service.</Typography>
        <Button variant='contained' sx={{
          width: { xs: '150px', md: '220px' }, height: { xs: '40px', md: '50px' }, textTransform: 'none',
          fontSize: { xs: 14, md: 18 }, fontWeight: 790, backgroundColor:'violet',
          borderRadius: { xs: '15px', md: '45px' }, mt:'20px', alignSelf:'flex-start', ml:{xs:'10px', md:'0px'}
        }} onClick={handle}>Start Free trial</Button>
      </Box>
    </Box>
  )
}

export default SectionLast
