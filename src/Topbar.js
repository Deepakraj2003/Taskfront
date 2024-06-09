import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import { Logout } from './Logout';

export default function Topbar() {
 const navigate=useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button color='inherit' onClick={()=>navigate("/")}>Home</Button>
        <Button color='inherit' onClick={()=>navigate("/addtask")}>Add Task</Button>
        
       
          {/* <Button color="inherit" onClick={()=>Logout()}>Logout</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}