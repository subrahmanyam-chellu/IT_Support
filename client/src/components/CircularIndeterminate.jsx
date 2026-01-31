import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CircularIndeterminate({texts}) {
  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', width: '100%', height: '100vh', position: 'fixed', zIndex: 3, backgroundColor: 'rgb(255, 255, 255, 0.5)'
    }}>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <CircularProgress sx={{ml:{xs:'55px', md:'0px'}}}/>
        <Typography variant='h5' color="error" sx={{mt:'25px', width:'100%'}}>{texts}</Typography>
      </Box>
    </Box>
  );
}
