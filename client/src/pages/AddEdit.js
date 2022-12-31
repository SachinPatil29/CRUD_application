import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

import './AddEdit.css';
// import { response } from 'express';

const AddEdit = () => {

    // const initialState = {
    //     name:"",
    //     email:"",
    //     contact:""
    // }
    const navigate = useNavigate()
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[id])


    const [state ,setState] = useState({
        name:"",
        email:"",
        contact:""
    })
    const{name,email,contact}= state;

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !contact)
        {
            toast.error("Please provide value into each input field");

        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                name,email,contact
            }).then(()=>{
                setState({name:"",email:"",contact:""})
            })
            .catch((error)=>toast.error("error"));

            toast.success("Contact Added Successfully")
           
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                name,email,contact
            }).then(()=>{
                setState({name:"",email:"",contact:""})
            })
            .catch((error)=>toast.error(error.response.data));

            toast.success("Contact Updated Successfully")
            // console.log(name,email,contact) 
            }
            setTimeout(()=> navigate('/'),500)
            
           
        }
        

    }

    const handleInputChange= (e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value});

    };
  return (
    <>
    <div  className='main' style={{marginTop:"100px"}}>
        <form action="" style={{
            margin:"auto",
            padding:"15px",
            maxwidth:"400px",
            alignContent:"center",
            display:"block"
        }} onSubmit={handleSubmit}>

            <label htmlFor="name"> Name </label>
            <input 
            type="text"
            id="name"
            name='name'
            placeholder='Your Name...'
            value={state.name || ""} 
            onChange={handleInputChange} />
            


            <label htmlFor="email"> Email </label>
            <input 
            type="email"
            id="email"
            name='email'
            placeholder='Your Email...'
            value={state.email || ""} 
            onChange={handleInputChange}/>
            

            <label htmlFor="contact"> Contact </label>
            <input 
            type="number"
            id="Contact"
            name='contact'
            placeholder='Your Contact...'
            value={state.contact || ""} 
            onChange={handleInputChange}/>
            

            <input type="submit" value={id ? "Update":"Save"}/>
            <Link to="/">
                <input type="button" value="Go Back" />
                </Link>
        </form>

    </div>
    </>
  )
}

export default AddEdit