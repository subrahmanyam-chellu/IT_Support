import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import './LandingPage2.css'
import HeroL from '../../components/HeroL';
import Section1 from '../../components/Section1';
import Testing from '../../components/Testing';
import Explain from '../../components/Explain';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = localStorage.getItem("x-token");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState();
  const [isModelOn, setIsModelOn] = React.useState();
  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  React.useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      if (decode.exp * 1000 > Date.now()) {
        if (decode.user.role.toLowerCase() == 'admin') {
          setIsAdmin(true);
          // navigate('/admin');
        }
        else {
          setIsAdmin(false);
          // navigate('/user');
        }
      }

    }
    callModel();
  }, [isModelOn])

  const handleLaunch = () => {
      if (!token) {
        navigate('/auth');
      }
      else if(isAdmin){
        navigate('/admin');
      }
      else{
        navigate('/user');
      }
  }

  const callModel = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/model`);
    if(response.status==200){
      setIsModelOn(true);
    }else{
      setIsModelOn(false);
    }
  }

  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'blanchedalmond', boxShadow: '4', height: { xs: '65px', md: '85px' }, paddingTop: { xs: '4.5px', md: '11px' } }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: 'black', fontSize: '40', display: { xs: 'none' } }} />
          </IconButton>
          <Box>
            <Typography sx={{ fontSize: { xs: '20px', md: '40px' }, mr: { xs: '103px' }, color: 'black', fontFamily: 'cooper' }}>AI_Support</Typography>
          </Box>
          <Button className="lauchbtn" sx={{
            width: { xs: '120px', md: '200px' }, height: { xs: '40px', md: '50px' }, fontSize: { xs: 14, md: 'large' },
            background: 'linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))'
          }} onClick={() => { handleLaunch(); }} >
            Lanuch Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'none', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'blanchedalmond', border: '3px solid black', borderRadius: '8px' },

          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Toolbar />
        <HeroL model={isModelOn} />
        <Section1 />
        <Testing />
        <Explain />
        <Footer />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
