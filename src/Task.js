import React from 'react';
import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { API } from './Global.js';

export default function Task({ taskTake, getTask }) {
  const navigate = useNavigate();

  const deletetask = (id) => {
    fetch(`${API}delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      return response.json();
    })
    .then(() => {
      getTask();
      alert(`${taskTake.task} Task was deleted Successfully!!`);
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      alert('An error occurred while deleting the task. Please try again later.');
    });
  };

  return (
    
       
          <TableRow key={taskTake._id}>
            <TableCell>{taskTake.task}</TableCell>
            <TableCell>{taskTake.taskid}</TableCell>
            <TableCell>{taskTake.date}</TableCell>
            <TableCell>{taskTake.summary}</TableCell>
            <TableCell>
             
              <IconButton color="primary" aria-label="movie-info" onClick={()=>{navigate(`/edit/${taskTake._id}`)}}>
                <EditIcon fontSize='medium' />
              </IconButton>
              <IconButton color="primary" aria-label="movie-info" onClick={() => deletetask(taskTake._id)}>
                <DeleteIcon fontSize='medium' />
              </IconButton>
              
              
            </TableCell>
          </TableRow>
        
  );
}
