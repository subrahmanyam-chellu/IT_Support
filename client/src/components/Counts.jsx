import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Counts = ({ counts }) => {

    return (
        <Box sx={{my:{xs:1, md:5}}}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', alignItems: 'center', width:{md:'1100px'} }}>
                    <Card sx={{textAlign:'center', width:{xs:'320px', md:'350px'}, height:{xs:'150px', md:'180px'}, backgroundColor:'#0a5ea756', my:'10px'}}>
                        <CardContent>
                            <Typography sx={{fontSize:{xs:35, md:40}, fontWeight:600, mb:{xs:1, md:1}}}>Total Tickets</Typography>
                            <Typography color='primary' sx={{fontSize:{xs:50, md:60}, fontWeight:600}}>{counts.allCount}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{textAlign:'center', width:{xs:'320px', md:'350px'}, height:{xs:'150px', md:'180px'}, backgroundColor:'#a70a277b', my:'10px'}}>
                        <CardContent>
                            <Typography sx={{fontSize:{xs:35, md:40}, fontWeight:600, mb:{xs:1, md:1}}}>pending Tickets</Typography>
                            <Typography color='error' sx={{fontSize:{xs:50, md:60}, fontWeight:600}}>{counts.pCount}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{textAlign:'center', width:{xs:'320px', md:'350px'}, height:{xs:'150px', md:'180px'}, backgroundColor:'#27a70a56', my:'10px'}}>
                        <CardContent>
                            <Typography sx={{fontSize:{xs:35, md:40}, fontWeight:600, mb:{xs:1, md:1}}}>Resolved Tickets</Typography>
                            <Typography color='success' sx={{fontSize:{xs:50, md:60}, fontWeight:600}}>{counts.rCount}</Typography>
                        </CardContent>
                    </Card>         
            </Box>
        </Box>
    )
}

export default Counts
