import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
function Stockout() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:2000/getallstockout")
    .then((result)=>{
      setData(result.data)
    })
  }, [])
  const handleDelete = (id)=>{
    axios.delete("http://localhost:2000/delete/"+ id)
    .then(()=>{
    axios.get("http://localhost:2000/getallstockout")
.then((result)=>{
  setData(result.data)
})
    })
  }
  return (
    <>
    <div>
      <div>
        <p className='text-center text-2xl font-bold'>Stock out Management</p>
      </div>
      <div>
        <Link to='/addstockout'>
        <button className='bg-green-500 rounded p-1 ml-1'>Add Stock Out</button>
        </Link>
      </div>
      <div className='flex flex-col items-center'>
        <table className='w-270 mt-3'>
          <thead>
            <tr>
              <th className='border p-3'>N <sup>0</sup></th>
              <th className='border p-3'>Spare part</th>
              <th className='border p-3'>StockOutQuantity</th>
              <th className='border p-3'>StockOut Unit Price</th>
              <th className='border p-3'>StockOut Total Price</th>
              <th className='border p-3'>StockOut Date</th>
              <th className='border p-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((stockout, index)=>{
              return (
                <tr key={stockout.id}>
                  <td className='border p-3'>{index + 1}</td>
                  <td className='border p-3'>{stockout.name}</td>
                  <td className='border p-3'>{stockout.stockoutquantity}</td>
                  <td className='border p-3'>{stockout.stockoutunitprice}</td>
                  <td className='border p-3'>{stockout.stockouttotalprice}</td>
                  <td className='border p-3'>{new Date(stockout.stockoutdate).toDateString('en')}</td>
                  <td className='border flex gap-1 p-3'>
                    <button onClick={()=>handleDelete(stockout.id)} className='bg-red-300 p-1 w-20 rounded'>Delete</button>
                    <Link to={'/update/'+ stockout.id}>
                    <button className='bg-green-600 p-1 w-20 rounded '>Edit</button></Link>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Stockout
