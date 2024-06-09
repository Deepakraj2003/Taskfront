import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Corrected import
import { API } from './Global';
import Topbar from './Topbar';

export default function Addtask() {
  const movievalidation = yup.object({
    date: yup.date().required('date is required'),
    task: yup.string().required('Task  is required'),
    taskid: yup.number().required('taskid is required'),
    summary: yup.string().required('Summary is required')
  });

  const formik = useFormik({
    initialValues: {
      date: '',
      task: '',
      taskid: '',
      summary: ''
    },
    validationSchema: movievalidation,
    onSubmit: (values) => {
      addtask(values);
    }
  });

  const navigate = useNavigate();

  const addtask = (values) => {
    fetch(`${API}post`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => navigate(`/`));
  };

  return (
    <>
    <Topbar />
    <form className='addform' onSubmit={formik.handleSubmit}>
      <h1>Add task</h1>
      <TextField
        id="outlined-basic"
        label="Task"
        variant="outlined"
        value={formik.values.task}
        onChange={formik.handleChange}
        name='task'
        onBlur={formik.handleBlur}
        error={formik.touched.task && !!formik.errors.task}
        helperText={formik.touched.task && formik.errors.task ? formik.errors.task : null}
      />

      <TextField
        id="outlined-basic"
        label="taskid"
        variant="outlined"
        value={formik.values.taskid}
        onChange={formik.handleChange}
        name='taskid'
        onBlur={formik.handleBlur}
        error={formik.touched.taskid && !!formik.errors.taskid}
        helperText={formik.touched.taskid && formik.errors.taskid ? formik.errors.taskid : null}
      />
      <TextField
        id="outlined-basic"
        label="Date"
        type="date"
        variant="outlined"
        decorations="none"
        value={formik.values.date}
        onChange={formik.handleChange}
        name='date'
        onBlur={formik.handleBlur}
        error={formik.touched.date && !!formik.errors.date}
        helperText={formik.touched.date && formik.errors.date ? formik.errors.date : null}
      />

      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={formik.values.summary}
        onChange={formik.handleChange}
        name='summary'
        onBlur={formik.handleBlur}
        error={formik.touched.summary && !!formik.errors.summary}
        helperText={formik.touched.summary && formik.errors.summary ? formik.errors.summary : null}
      />

      <Button variant="contained" type='submit'>Submit</Button>
    </form>
    </>
  );
}
