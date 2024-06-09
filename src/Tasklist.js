import React, { useEffect, useState } from 'react'
import Task from './Task';
import { API } from './Global';
import Topbar from './Topbar';
import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
export default function Tasklist() {

    const [task,setTask]=useState([]);
    const getTask=()=>{
        fetch(`${API}getmany`,{method:"GET",
        headers:{"backend-token":localStorage['storetoken']}
    })
    .then((data)=>data.json())
    .then((mvs)=>{setTask(mvs)});
    };
    useEffect(()=>{
        getTask();
    },[]);
    console.log(task);
  return (
    <>
    <Topbar />
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="task table">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Task ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Summ</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {task.map((element,index) => (
        <Task key={index} taskTake={element} getTask={getTask} />
      ))}
      </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  )
}