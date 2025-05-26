import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
function MemberLogin() {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        username:'',
        password:''
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
 
    const handleChange  =(e)=>{
  setformData({...formData, [e.target.name]:e.target.value})
  setMessage('')
    }
    const handleLogin = ()=>{
        axios.post("http://localhost:2000/login", formData)
        .then((result)=>{
            if(result.data.message === "Incorrect Username or password"){
             setMessage(result.data.message)
            }
            else{
                setMessage("Logged in")
                localStorage.setItem("isLoggedIn", true)
                setTimeout(()=>{
                navigate('/sparepart')
                }, 2000)
            }
        })
    }
  return (
    <div className='bg-blue-700/90 text-white  h-screen w-full flex flex-col items-center'>
       <p className='text-center mt-40 text-3xl font-extrabold' >Login</p>
      <form onSubmit={handleSubmit} className='border rounded flex flex-col w-170 mt-10 p-3 gap-1 bg-green-200/20'>
        <p className='text-center'>{message}</p>
        <label htmlFor="username" className='font-bold'>Username</label>
        <input onChange={handleChange} className=' pl-3 h-10 rounded border-2 border-amber-200' type="text" name="username" id="username" placeholder='Enter Username' />
        <label htmlFor="password" className='font-bold'>Password</label>
        <input onChange={handleChange} className=' pl-3 h-10 rounded border-2 border-amber-200' type="password" name="password" id="password" placeholder='Enter Password' />
      <button onClick={handleLogin} className='bg-black mt-2 h-10 rounded border-4 border-amber-200 font-bold'>Login</button>
     <div className='flex gap-10'>
      <p>Dont have account ?</p><Link className='text-blue-200' to='/register'>Register</Link>
     </div>
      </form>
    </div>
  )
}

export default MemberLogin
