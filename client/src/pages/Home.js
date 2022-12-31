import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import "./Home.css";
import {toast} from 'react-toastify';
import axios from 'axios';

const Home = () => {
    const [data,setData] = useState([]);
    const loadData = async()=>{
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data);
    }
    useEffect(() => {
        loadData();
    }, []);

    const deletContact=(id)=>{
        if(window.confirm("Are you that you wanted to delete that contact"))
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success("Deleted successfully");
        setTimeout(()=> loadData(),500);

    }
    
  return (
    <>
    <div style={{marginTop:"150px"}}>
        
        <center>
            <Link to="/addcontact">
            <button className='btn btn-contact'>Add Contact</button>
            </Link>
        <table className='styled-table' border={"1px solid black"}>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Name</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Contact</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>{
                    // console.log(item.id)
                    // console.log(index+1)
                    return(
                        <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>

                                <button className="btn btn-delete" onClick={()=>deletContact(item.id)}>Delete</button>

                                <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </center>
      
    </div>
        
    </>
  )
}

export default Home