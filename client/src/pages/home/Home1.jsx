import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HeroL from '../../components/HeroL';
import Section1 from '../../components/Section1';
import Testing from '../../components/Testing';
import Explain from '../../components/Explain';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SectionLast from '../../components/SectionLast';
import CssBaseline from '@mui/material/CssBaseline';



export default function ButtonAppBar() {

    const token = localStorage.getItem("x-token");
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState();
    const [isModelOn, setIsModelOn] = useState();


    useEffect(() => {
        if (token) {
            const decode = jwtDecode(token);
            if (decode.exp * 1000 > Date.now()) {
                if (decode.user.role.toLowerCase() == 'admin') {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                }
            }
        }
        callModel();
    }, [isModelOn])

    const handleLaunch = () => {
        if (!token) {
            navigate('/auth');
        }
        else if (isAdmin) {
            navigate('/admin');
        }
        else {
            navigate('/user');
        }
    }

    const callModel = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/model`);
        if (response.status == 200) {
            setIsModelOn(true);
        } else {
            setIsModelOn(false);
        }
    }

    return (
        <Box sx={{maxWidth:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <AppBar sx={{position:'fixed'}}>
                <Toolbar sx={{maxWidth:'100%', justifyContent:'space-between', backgroundColor:'blanchedalmond', height:{xs:'65px', sm:'75px'}}}>
                    <Box>
                        <Typography sx={{ fontSize: { xs: '20px', md: '40px' }, color: 'black', fontFamily: 'cooper', fontWeight:600}}>AI_Support</Typography>
                    </Box>
                    <Button className="lauchbtn" sx={{
                        width: { xs: '120px', md: '200px' }, height: { xs: '40px', md: '50px' }, fontSize: { xs: 14, md: 'large' },
                        background: 'linear-gradient(to right, rgba(230, 0, 255, 0.899), rgba(0, 221, 255, 0.765))'
                    }} onClick={() => { handleLaunch(); }} >
                        Lanuch Dashboard
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
                 <Toolbar />
                 <HeroL model={isModelOn} />
                 <Section1 />
                 <Testing />
                 <Explain /> 
                 <SectionLast />
                 <Footer />
            </Box>
        </Box>
    );
}
