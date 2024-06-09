import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API } from './Global';
import Topbar from './Topbar';

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ttask, setTtask] = useState(null);

    useEffect(() => {
        fetch(`${API}getone/${id}`, { method: "GET" })
            .then((data) => data.json())
            .then((mv) => setTtask(mv));
    }, [id]);

    return (
        <>
            <Topbar />
            <div>
                {ttask ? <EditForm ttask={ttask} navigate={navigate} /> : "Loading..."}
            </div>
        </>
    );
}

function EditForm({ ttask, navigate }) {
    const ttaskValidation = yup.object({
        date: yup.date().required('Date is required'),
        task: yup.string().required('Task is required'),
        taskid: yup.number().required('Task ID is required'),
        summary: yup.string().required('Summary is required')
    });

    const formik = useFormik({
        initialValues: {
            task: ttask.task,
            taskid: ttask.taskid,
            date: ttask.date,
            summary: ttask.summary,
        },
        validationSchema: ttaskValidation,
        onSubmit: (values) => {
            updateTask(values);
        }
    });

    const updateTask = (values) => {
        fetch(`${API}update/${ttask._id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(() => navigate("/"))
            .catch((error) => console.error('Error:', error));
    }

    return (
        <form className='addform' onSubmit={formik.handleSubmit}>
            <h1>Edit Task</h1>
            <TextField
                id="outlined-task"
                label="Task"
                variant="outlined"
                value={formik.values.task}
                onChange={formik.handleChange}
                name='task'
                onBlur={formik.handleBlur}
                error={formik.touched.task && Boolean(formik.errors.task)}
                helperText={formik.touched.task && formik.errors.task}
            />
            <TextField
                id="outlined-taskid"
                label="Task ID"
                variant="outlined"
                value={formik.values.taskid}
                onChange={formik.handleChange}
                name='taskid'
                onBlur={formik.handleBlur}
                error={formik.touched.taskid && Boolean(formik.errors.taskid)}
                helperText={formik.touched.taskid && formik.errors.taskid}
            />
            <TextField
                id="outlined-date"
                label="Date"
                type="date"
                variant="outlined"
                value={formik.values.date}
                onChange={formik.handleChange}
                name='date'
                onBlur={formik.handleBlur}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
            />
            <TextField
                id="outlined-summary"
                label="Summary"
                variant="outlined"
                value={formik.values.summary}
                onChange={formik.handleChange}
                name='summary'
                onBlur={formik.handleBlur}
                error={formik.touched.summary && Boolean(formik.errors.summary)}
                helperText={formik.touched.summary && formik.errors.summary}
            />
            <Button variant="contained" type='submit'>Submit</Button>
        </form>
    );
}
