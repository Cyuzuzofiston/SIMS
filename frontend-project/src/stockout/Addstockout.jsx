import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

function Addstockout() {
    const navigate = useNavigate()
    const [sparepart, setsparePart] = useState([])
    const [formData, setformData] = useState({
        name: '',
        stockoutquantity: '',
        stockoutunitprice: '',
        stockouttotalprice: ''
    })
    useEffect(() => {
        axios.get("http://localhost:2000/getsp")
            .then((result) => {
                setsparePart(result.data)
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (e) => {
    setformData({...formData, [e.target.name]:e.target.value})
    }
    const handleAdd = ()=>{
        const {name, stockoutquantity, stockoutunitprice,stockouttotalprice} = formData
        if(!name || !stockoutquantity || !stockoutunitprice || !stockouttotalprice){
            alert("All fields are required")
        }
        else{
            axios.post("http://localhost:2000/addstockout", formData)
            alert("Stockout Added")
            navigate('/stockout')

        }
        
    }
    return (
        <>
            <div className='flex flex-col items-center'>
                <form onClick={handleSubmit} className='flex gap-1 mt-10 p-2 rounded flex-col w-100 border'>
                    <label htmlFor="sparepart">Spare Part</label>
                    <select onChange={handleChange} className='border h-9 rounded pl-2' name="name" id="sparepart">
                        <option value="">Select Spare Part</option>
                        {sparepart.map((sp) => {
                            return (
                                <option value={sp.name} key={sp.name}>
                                    {sp.name}
                                </option>
                            )

                        })}
                    </select>
                    <label htmlFor="stockoutquantity">StockOut Quantity</label>
                    <input onChange={handleChange} className='border h-9 rounded pl-2' type="number" name="stockoutquantity" id="stockoutquantity" />

                    <label htmlFor="stockoutquantity">StockOut Unit Price</label>
                    <input onChange={handleChange} className='border h-9 rounded pl-2' type="number" name="stockoutunitprice" id="stockoutquantity" />

                    <label htmlFor="stockoutquantity">StockOut Total Price</label>
                    <input onChange={handleChange} className='border h-9 rounded pl-2' type="number" name="stockouttotalprice" id="stockoutquantity" />
                    <button onClick={handleAdd} className='bg-black/40 mt-2 h-9 rounded'>Add stock out</button>
                </form>
            </div>
        </>
    )
}

export default Addstockout
