import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
   <nav>
     <Link to='/' >Home</Link> <br/>
     <Link to='/user/register' >Register</Link> <br />
     <Link to='/user/login' >Login</Link> <br />

   </nav>
  )
}

export default Navigation