import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function BasicSelect({ valued, row }) {
  const [status, setStatus] = React.useState(valued);
  const token = localStorage.getItem("x-token");


  const handleChange = async (event) => {
    setStatus(event.target.value);
    const newStatus = event.target.value;
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/updateticket/${row.ticketId}`, {
        status: newStatus
      },
        {
          headers: {
            "x-token":token
          }
        });
      if (response.status == 200) {
        alert("successfully updated");
      } else {
        alert("updation failed");
      }


    } catch (err) {
      alert("internal server error");
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"open"}>Open</MenuItem>
          <MenuItem value={"in-progress"}>In-progress</MenuItem>
          <MenuItem value={"resolved"}>Resolved</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
