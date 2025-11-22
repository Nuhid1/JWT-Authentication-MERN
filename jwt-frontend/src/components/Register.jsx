import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
      navigate("/user/register");
    })
  },[]);

  const handleRegister = (e)=>{
    e.preventDefault();

    axios.post("http://localhost:3000/user/register", {username, password}).then(
      ()=>{
        console.log("user is register");
        navigate("/user/login");
      }
    ).catch((error)=>{ 
      console.log(error);
      navigate("/user/register")
     })
  }

  return (
    <div>
      <h2>register page</h2>
      <form onSubmit={handleRegister}>
        <h4>input name</h4>
        <input type='text' placeholder='username' value={username}
         onChange={getName} required/>

         <h4>input password</h4> 
         <input type='password' placeholder='password' value={password}
         onChange={getPassword} required />

         <br/><button type='submit' >register</button>
      </form>

    </div>
  )
}

export default Register