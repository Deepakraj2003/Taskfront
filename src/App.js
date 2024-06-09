
import './App.css';
import {Routes,Route} from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Addtask from './Addtask';
import Tasklist from './Tasklist';
import EditTask from './EditTask';

function App() {
    const [mode,setMode]=useState("light");
   const darkTheme = createTheme({
    palette: {
      mode: mode,
     },
   });
  
  return (
    <div className="App">
       <ThemeProvider theme={darkTheme}>
        <Paper style={{minHeight:"100vh",borderRadius:"0%"}} elevation={9}>
        <Routes>
          {/* <Route path="/register" element={<Register/>}/> */}
          <Route path="/" element={<Tasklist/>}/>
          <Route path="/addtask" element={<Addtask/>}/>
          <Route path="/edit/:id" element={<EditTask />} />
         
        </Routes>
        </Paper>
        </ThemeProvider>
    </div>
  );
}

export default App;

