import Typography from '@mui/material/Typography'
import Brain from '/src/assets/memory.svg';
import Realtime from '/src/assets/realtime.svg';
import Shield from '/src/assets/shield.svg';
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const Explain = () => {

  const data = [ {logo: Brain, data:'Dual-Head Transformer', text:'Parallel processing for semantic categorization and priority detection'},
                 {logo: Realtime, data:'Real-time Processing', text:'Handle 50k+ concurrent requests with minimal latency'},
                 {logo: Shield, data:'Enterprise Security', text:'GDPR compliant with end-to-end encryption'},
  ]

  return (
    <Box>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', my:'25px'}}>
            <Typography sx={{fontSize:{xs:30, md:60}, fontWeight:600, mt:'75px'}}>Why Choose NexusAI?</Typography>
            <Typography sx={{fontSize:{xs:18, md:24}, fontWeight:400, mt:'25px'}}>Built with enterprise-grade technology and security standards</Typography>
            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, width:'100%', justifyContent:'space-around', alignItems:'center',
                                           minWidth:'300px', m:{xs:'35px', md:'65px'}}}>
                {
                   data.map((item, i)=>{
                    return(
                        <Card key={i} className='cards' sx={{background:"linear-gradient(to top, rgba(214, 166, 33, 0.54), rgba(206, 227, 17, 0.95))", boxShadow:'3px 3px 5px 5px grey', width:'320px', mb:'20px'}}>
                            <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', m:'35px' }}>
                                <img src={item.logo} style={{width:80, height:80}}></img>
                                <Typography sx={{fontSize:30, fontWeight:'bolder', mb:'20px'}}>{item.data}</Typography>
                                <Typography sx={{fontSize:14, mb:'25px'}}>{item.text}</Typography>
                            </CardContent>
                        </Card>
                    )
                   })
                }
            </Box>
        </Box>
    </Box>
  )
}

export default Explain
