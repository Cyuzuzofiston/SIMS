import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Addsparepart() {
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        name:'',
        category:'',
        quantity:'',
        unitprice:'',
        totalprice:'',
        status:''

    })
    const handleSubmit  =(e)=>{
        e.preventDefault()
    }
    const handleChange = (e)=>{
        setformData({...formData, [e.target.name]:e.target.value})
    }
    const handleAdd = ()=>{
        const {name, category, quantity, unitprice, totalprice} = formData
        if(!name || !category || !quantity || !unitprice || !totalprice){
            alert("All fields are required")
        }
        else{
            axios.post("http://localhost:2000/addsparepart", formData)
             .then(()=>{
                alert("Spare Part registered successfully")
                    navigate('/sparepart')
             })
        }
    }
  return (
  <>
  <div>
    <div>
        <p className='text-center pt-2' style={{fontSize:"18px", }}>Spare Parts Management</p>
    </div>
    <div className='flex flex-col items-center'>
        <form onSubmit={handleSubmit} className='flex bg-black/10 flex-col border p-2 mt-2 w w-100 rounded'>
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' type="text" name="name" id="name" />
            <label htmlFor="category">Category</label>
            <input onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' type="text" name="category" id="category" />
            <label htmlFor="quantity">Quantity</label>
            <input onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' type="number" name="quantity" id="quantity" />
            <label htmlFor="unitprice">Unit Price</label>
            <input onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' type="number" name="unitprice" id="unitprice" />
            <label htmlFor="totalprice">Total Price</label>
            <input onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' type="number" name="totalprice" id="totalprice" />
            <label htmlFor="status">Status</label>
                <select onChange={handleChange} className='border h-9 rounded pl-3 focus:outline-blue-800' name="status" id="status">
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Not available">Not available</option>
                </select>
         <button onClick={handleAdd} className='bg-green-900 mt-1 h-9 rounded'>Add</button>
        </form>
    </div>
  </div>
  </>
  )
}

export default Addsparepart
