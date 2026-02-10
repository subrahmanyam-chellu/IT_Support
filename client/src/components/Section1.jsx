import Box from '@mui/material/Box'
import React from 'react'
import  Accuracy from '/src/assets/Accuracy.svg';
import  Responsetime from '/src/assets/Responsetime.svg';
import  Samples from '/src/assets/data.svg';
import  Uptime from '/src/assets/uptime.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Section1 = () => {
  
    const data = [{Logo: Accuracy, data:'98.4%', name:'Accuracy'},
                  {Logo: Responsetime, data:'<600ms', name:'Response time'},
                  {Logo: Samples, data:'1.2M', name:'Samples'},
                  {Logo: Uptime, data:'99%', name:'Uptime'}
    ]

  return (
    <Box sx={{width:'100%', backgroundColor:'#f4f4f4', minHeight:'300px'}}>
        <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around',
              alignItems:'center', py:{xs:'40px', md:'40px'}}}>
            {
                data.map((item, i)=>{
                    const Logo = item.Logo;
                    return (
                    
                    <Card key={i} className='cards' sx={{display:'flex', mb:'20px', justifyContent:'center', width:{xs:'320px', md:'330px'}, minHeight:{xs:'', md:'230px'},
                     background:"linear-gradient(to top, rgba(255, 179, 0, 0.59), rgba(0, 229, 255, 0.77))", boxShadow: '5px 5px 10px 3px grey', textAlign:'center'}}>
                        <CardContent>
                            <img src={Logo} style={{width:80, height:80}}/>
                            <Typography sx={{fontSize:'3.5rem', fontWeight:'bold'}}>{item.data}</Typography>
                            <Typography sx={{fontSize:'1.25rem'}}>{item.name}</Typography>
                        </CardContent>
                    </Card>
                )})
            }

        </Box>
    </Box>
  )
}

export default Section1
