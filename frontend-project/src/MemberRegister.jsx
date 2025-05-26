import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function MemberRegister() {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    username:'',
    password:''
  })
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  const handleChange = (e)=>{
    setformData({...formData, [e.target.name]:e.target.value})
  }
  const handleAdd = ()=>{
axios.post("http://localhost:2000/createmember", formData)
.then((result)=>{
    if(result.data.message === "Username Alredy Taken"){
      setMessage(result.data.message)
    }
    else{
      setMessage("Member added successfully")
      setTimeout(()=>{
        navigate('/')

      }, 2000)
    }
  }
)}
  return (
  <div className='bg-blue-700/90 text-white  h-screen w-full flex flex-col items-center'>
       <p className='text-center mt-30 text-4xl font-extrabold' >Registration</p>
      <form onSubmit={handleSubmit} className='border rounded flex flex-col w-150 mt-20 p-3 gap-1 bg-green-200/20'>
       <p className='text-center'>{message}</p>
        <label htmlFor="username" className='font-bold'>Username</label>
        <input onChange={handleChange} className=' pl-3 h-10 rounded border-2 border-amber-200' type="text" name="username" id="username" placeholder='Enter Username' />
        <label htmlFor="password" className='font-bold'>Password</label>
        <input onChange={handleChange} className=' pl-3 h-10 rounded border-2 border-amber-200' type="password" name="password" id="password" placeholder='Enter Password' />
      <button onClick={handleAdd} className='bg-black mt-2 h-10 rounded border-4 border-amber-200 font-bold'>Register</button>
     <div className='flex gap-10'>
      <p>Already you have account ?</p><Link className='text-blue-200' to='/'>Login</Link>
     </div>
      </form>
    </div>
  )
}

export default MemberRegister
