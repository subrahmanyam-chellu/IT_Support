import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import axios from 'axios';
import CircularIndeterminate from '/src/components/CircularIndeterminate';

const Testing = () => {

    const [data, setData] = React.useState({ predicted_category: "Category", predicted_priority: "Priority" })
    const [issue, setIssue] = React.useState();
    const [error, setError] = useState([false, ""]);
    const [loading, setLoading] = useState();

    const handleTest = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/model/predict`,
                { issue }
            );
            if (response.status === 200) {
                setData(response.data);
                setLoading(false);
            }
        } catch (err) {
            setError([true, err.response?.data.toString() || err.message]);
            setLoading(false);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#e2f8af9f' }}>
            {loading&&<CircularIndeterminate texts={"Analysing..."}/>}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '360px', md: '800px' }, mx: { xs: '20px', md: '352px' } }}>
                <Typography sx={{ fontSize: { xs: 40, md: 65 }, fontWeight: 800, pt: { xs: '30px', md: '50px' } }}>See AI in Action</Typography>
                <Typography sx={{ fontSize: { xs: 17, md: 24 }, pt: { xs: '30px', md: '30px' } }}>Experience real-time classification of support</Typography>
                <Typography sx={{ fontSize: { xs: 17, md: 24 } }}>tickets with our AI-powered engine</Typography>
                <Box sx={{
                    display: 'flex', flexDirection: { xs: 'column' }, width: '100%', height: { xs: '380px', md: '330px' },
                    backgroundColor: 'black', borderRadius: '15px', my: { xs: '30px', md: '50px' }, pt: { xs: '25px', md: '50px' }, overflow: 'hidden'
                }}>
                    <Typography sx={{ fontSize: 30, color: 'green', mb: { md: '10px' }, ml: '10px' }}>Test the model....</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxHeight: { xs: 45, md: 80 } }}>
                        <TextField sx={{ width: { xs: '337px', md: '650px' }, border: '2px solid green', borderRadius: '10px', m: '10px', '& .MuiOutlinedInput-root': { color: 'green' } }} placeholder="Enter the issue description..."
                                         onChange={(e) => { setIssue(e.target.value) }}></TextField>
                        <Button variant='contained' color='success' sx={{ ml: { xs: '10px', md: '25px' }, m: '10px' }} onClick={() => { handleTest(); }}>Analyze</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: { xs: '125px', md: '10px' } }}>
                        <Card sx={{ width: { xs: '150px' }, backgroundColor: 'inherit', border: '2px solid green', height: { xs: '90px' } }}>
                            <CardContent><Typography color='success' sx={{ fontSize: 25, fontWeight: 'bolder', textAlign: 'center' }}>{data.predicted_category}</Typography></CardContent>
                        </Card>
                        <Card sx={{ width: { xs: '150px' }, backgroundColor: 'inherit', border: '2px solid green', height: { xs: '90px' } }}>
                            <CardContent><Typography color='success' sx={{ fontSize: 25, fontWeight: 'bolder', textAlign: 'center' }}>{data.predicted_priority}</Typography></CardContent>
                        </Card>
                    </Box>
                    {error[0] && <Typography color='error' sx={{ textAlign: 'center' }}>{error[1]}</Typography>}
                </Box>

            </Box>
        </Box>
    )
}

export default Testing
