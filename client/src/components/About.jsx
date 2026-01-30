import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react'

const About = () => {
  return (
    <Box sx={{backgroundColor:'blanchedalmond', maxHeight:'100%'}}>
      <Box>
        <Typography sx={{fontSize:{xs:'20px',md:'36px'}}}>Licensed under MIT License</Typography>
      </Box>
      <Box sx={{display:'flex', flexDirection:{xs:'column',md:'row'}, justifyContent:'space-between'}}>
       <Typography sx={{mb:'20px', ml:{md:'35px'}, fontSize:{md:'24px'}}}>About us</Typography>
       <Typography sx={{mb:'20px', fontSize:{md:'24px'}}}>Contact us</Typography>
       <Typography sx={{mb:'20px', mr:{md:'35px'}, fontSize:{md:'24px'}}}>Our services</Typography>
      </Box>
    </Box>
  )
}

export default About;
