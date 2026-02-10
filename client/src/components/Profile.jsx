import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = ({ users }) => {

return (
  <Box sx={{border:'2px solid cyan', borderRadius:'15px', px:'15px', backgroundColor:'#b2b2a3e6'}}>
    <Typography sx={{ fontSize: { xs: 24, md: 30 }, mt: { xs: '15px', md: '25px' } }}>Id :</Typography>
    <Typography sx={{ fontSize: { xs: 14, md: 24 } }}>{users?._id}</Typography>
    <Divider sx={{ height: 2, bgcolor:'black'}}/>
    <Typography sx={{ fontSize: { xs: 24, md: 30 }, mt: { xs: '15px', md: '25px' } }}>Name :</Typography>
    <Typography sx={{ fontSize: { xs: 14, md: 24 } }}>{users?.name}</Typography>
    <Divider sx={{ height: 2, bgcolor:'black'}}/>
    <Typography sx={{ fontSize: { xs: 24, md: 30 }, mt: { xs: '15px', md: '25px' } }}>Email :</Typography>
    <Typography sx={{ fontSize: { xs: 14, md: 24 } }}>{users?.email}</Typography>
    <Divider sx={{ height: 2, bgcolor:'black'}}/>
    <Typography sx={{ fontSize: { xs: 24, md: 30 }, mt: { xs: '15px', md: '25px' } }}>Role :</Typography>
    <Typography sx={{ fontSize: { xs: 14, md: 24 }, mb:'15px' }}>{users?.role}</Typography>
  </Box>
)
}

export default Profile
