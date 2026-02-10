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
import '/src/pages/landingpage2/LandingPage2.css'
import { useState } from 'react';
import HeroL from '../../components/HeroL';
import Section1 from '../../components/Section1';
import Testing from '../../components/Testing';
import Explain from '../../components/Explain';
import Footer from '../../components/Footer';
import User from './User';
import Menu from '../../components/Menu'
import Greeting from '../../components/Greeting';
import Generate from '../../components/Generate';
import Tickets from '../../components/Tickets';
import Profile from '../../components/Profile';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function User1(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [section, setSection] = useState(1);

    const handleSection = (Num) => {
        setSection(Num);
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            {/* <Typography variant="h6" sx={{ my: 2 }}>
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
            </List> */}
            <Menu/>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

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
                        <MenuIcon sx={{ color: 'black', fontSize: '40' }} />
                    </IconButton>
                    <Box>
                        <Typography sx={{ fontSize: { xs: '20px', md: '40px' }, mr: { xs: '103px' }, color: 'black', fontFamily: 'cooper' }}>AI_Support</Typography>
                    </Box>
                    <Button className="lauchbtn" sx={{ width: { xs: '120px', md: '200px' }, height: { xs: '40px', md: '50px' }, fontSize: { xs: 14, md: 'large' } }} >
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'blanchedalmond', border: '3px solid black', borderRadius: '8px' },

                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ px: { xs: 1, md: 1 } }}>
                <Toolbar />
                <Box sx={{ width: '100%', backgroundColor: 'beige', height: '100vh' }}>
                    <Box sx={{ display:'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
                        <Box sx={{display:{xs:'none', md:'flex'}, width: { xs: '100%', md: '350px', m: { xs: '35px' } } }}>
                            <Menu setSection={setSection} />
                        </Box>
                        <Box sx={{ m: { xs: '35px' }, width: { xs: '320px', md: '800px' } }}>
                            <Greeting />
                            {section == 1 &&
                                <Generate />
                            }
                            {
                                section == 2 &&
                                <Tickets />
                            }
                            {
                                section == 3 &&
                                <Profile />
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

User1.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default User1;
