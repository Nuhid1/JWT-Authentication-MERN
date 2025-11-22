import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");

  const getName = (event)=>{
    setUsername(event.target.value)
  }
  const getPassword = (event)=>{
    setPassword(event.target.value)
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/user/profile", {
      headers: {
        Authorization: token
      }
    }).then((res)=> navigate("/user/profile")).catch((error)=>{
      navigate("/user/login");
    })
  },[]);

  const handleLogin = (e)=>{
    e.preventDefault();

    axios.post("http://localhost:3000/user/login", {username, password}).then(
      (user)=>{
        localStorage.setItem("token", user.data.token);
        console.log("user is logged in");
        navigate("/user/profile")
      }
    ).catch((error)=>{ 
      console.log(error);
      navigate("/user/login")
     })
  }
  return (
    <div>
        <h2>login page</h2>
        <form onSubmit={handleLogin}>
        <h4>input name</h4>
        <input type='text' placeholder='username' value={username}
         onChange={getName} required/>

         <h4>input password</h4> 
         <input type='password' placeholder='password' value={password}
         onChange={getPassword} required />

         <br/><button type='submit' >login</button>
      </form>
    </div>
  )
}

export default Login