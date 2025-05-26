import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Addstockin() {
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        name: '',
        stockinquantity:''
    })
   const handleAdd = () => {
    const { sparepart, stockinquantity } = formData;
    if (!sparepart || !stockinquantity) {
        alert("All fields are required");
    } else {
        axios.post("http://localhost:2000/addstockin", {
            name: sparepart,
            stockinquantity: stockinquantity
        })
        .then(() => {
            alert("✅ Stock in Added");
            navigate('/stockin');
        })
        .catch((err) => {
            console.error("Error adding stock in:", err);
            alert("Failed to add stock in");
        });
    }
}

    const handleSubmit = (e)=>{
   e.preventDefault()
    }   
     const handleChange = (e)=>{
        setformData({...formData, [e.target.name]:e.target.value})
    }
    const [sparePart, setsparePart] = useState([])
    useEffect(()=>{
  axios.get("http://localhost:2000/getallspareparts")
  .then((result)=>{
    setsparePart(result.data)
  })
    }, [])
  return (
    <>
    <div>
        <div> <p className='text-center mt-4' style={{fontSize:"18px"}}>Add Stock In</p></div>
        <div className='flex flex-col items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1 border p-2 w-100  rounded'>
            <label htmlFor="sparepart">Spare Part</label>
        <select value={formData.sparepart} onChange={handleChange} className='border h-9 pl-3 focus:outline-blue-900 rounded' name="sparepart" id="sparepart">
            <option value="">Select Spare Part</option>
              {sparePart.map((sparepart)=>{
                return (
                  
                    <option key={sparepart.name} value={sparepart.name}>
                        {sparepart.name}
                    </option>
                )
              })}
        </select>
        <label htmlFor="stockinquantity">StockIn Quantity</label>
        <input onChange={handleChange} className='border h-9 pl-3 focus:outline-blue-900 rounded' type="text" name="stockinquantity" id="stockinquantity" />
           <button onClick={handleAdd} className='bg-indigo-900 rounded h-9'>Add Stock In</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Addstockin
