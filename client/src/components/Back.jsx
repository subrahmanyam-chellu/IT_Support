import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'

const Back = ({onButtonClick}) => {
  return (
    <Box sx={{my:{xs:'25px'}}}>
        <Button variant='contained' onClick={onButtonClick}>Back</Button>
    </Box>
  )
}

export default Back
