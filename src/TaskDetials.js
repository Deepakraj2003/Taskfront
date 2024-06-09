import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { API } from './Global';
export default function TaskDetials() {
    const{id}=useParams();
    console.log(id);

    const navigate=useNavigate();
    const[movie,setMovie]=useState([]);

   
    useEffect(()=>{
        fetch(`${API}/getone/${id}`,{method:"GET"})
        .then((data)=>data.json()).then((mv)=>setMovie(mv));
    },[]);

    const ratingstyle={
       color: movie.rating >=8.5 ?"green":"red"    };
    
  return (
    <>
     <div className="movie-detial-container">
        <div className="movie-spec">
            <h3 className="movie-rating" >{movie.id}</h3>
            <h2 className="movie-name">{movie.task}</h2>
            <h2 className="movie-name">{movie.date}</h2>
            
        </div>
        <p className="movie-summary">{movie.summary}</p>
     </div>
     <Button color='inherit' variant='contained' startIcon ={ <ArrowBackIcon /> } onClick={()=>navigate(-1)}>Back</Button>
    </>
    
  ) 
}
