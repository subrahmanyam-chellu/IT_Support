import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor:'blanchedalmond', boxShadow:'4', height:{xs:'65px', md:'85px'}, paddingTop:{xs:'4.5px', md:'11px'}}}>
        <Toolbar>
          <Box>
            <Typography sx={{fontSize:{xs:'20px', md:'40px'}, mr:{xs:'103px'}, color:'black', fontFamily:'cooper'}}>AI_Support</Typography>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
