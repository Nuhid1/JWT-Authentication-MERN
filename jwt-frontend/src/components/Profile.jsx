import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/user/profile", {
      headers: {
        Authorization: token
      }
    }).then((res)=> console.log(res)).catch((error)=>{
      navigate("/user/login");
    })
  },[]);
  
  return (
    <div>
        <h2>profile page</h2>
    </div>
  )
}

export default Profile