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
        if (validate()) {
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
        }
    };

    const validate = () => {
        if (!issue||issue?.length<15) {
            setError([true, "minmum 15 characters needed"]);
            return false;
        }
        else {
            setError([false, ""]);
            return true;
        }
    }

    return (
        <Box sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e2f8af9f', justifyContent:'center'}} >

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', maxWidth: '100%', px: { xs: '0px', md: '356px' } }}>
                <Typography sx={{ fontSize: { xs: 40, md: 65 }, fontWeight: 800, pt: { xs: '30px', md: '50px' } }}>See AI in Action</Typography>
                <Typography sx={{ fontSize: { xs: 17, md: 24 }, pt: { xs: '30px', md: '30px' } }}>Experience real-time classification of support</Typography>
                <Typography sx={{ fontSize: { xs: 17, md: 24 } }}>tickets with our AI-powered engine</Typography>
                <Box sx={{
                    display: 'flex', flexDirection: { xs: 'column' }, maxWidth: '100%', height: { xs: '360px', md: '330px' }, mx:{xs:'25px', md:'0px'},
                    backgroundColor: 'black', borderRadius: '15px', my: { xs: '30px', md: '50px' }, pt: { xs: '25px', md: '50px' }, overflow: 'hidden'
                }}>
                    {loading &&
                        <CircularIndeterminate texts={"Analysing..."} />
                    }
                    <Typography sx={{ fontSize: 30, color: 'green', mb: { md: '10px' }, ml: '10px' }}>Test the model....</Typography>
                    <Box component="form" onSubmit={handleTest} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxHeight: { xs: 45, md: 80 } }}>
                        <TextField required sx={{ width: { xs: '337px', md: '650px' }, border: '2px solid green', borderRadius: '10px', m: '10px', '& .MuiOutlinedInput-root': { color: 'green' } }} placeholder="Enter the issue description..."
                            onChange={(e) => { setIssue(e.target.value) }}></TextField>
                        <Button variant='contained' color='success' sx={{ ml: { xs: '10px', md: '25px' }, m: '10px' }} onClick={() => { handleTest(); }}>Analyze</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: { xs: '125px', md: '10px' }, mb: { xs: '20px' } }}>
                        <Card sx={{ width: { xs: '150px' }, backgroundColor: 'inherit', border: '2px solid green', height: { xs: '70px' } }}>
                            <CardContent><Typography color='success' sx={{ fontSize: 25, fontWeight: 'bolder', textAlign: 'center' }}>{data.predicted_category}</Typography></CardContent>
                        </Card>
                        <Card sx={{ width: { xs: '150px' }, backgroundColor: 'inherit', border: '2px solid green', height: { xs: '70px' } }}>
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
