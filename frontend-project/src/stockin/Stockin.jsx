import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
function Stockin() {
  const [data, setData] = useState([])
  useEffect(()=>{
  axios.get("http://localhost:2000/getstockin")
  .then((result)=>{
    setData(result.data)
  })
  }, [])
  return (
   <>
   <div>
    <div><p className='text-center pt-6 font-bold' style={{fontSize:'19px'}}>Stock in Management</p></div>
  <div>
    <Link to='/addstockin'>
    <button className='bg-green-500 text-black p-1 rounded ml-1 mt-2'>Add StockIn</button>
    </Link>
  </div>
  <div className='flex items-center flex-col'>
    <table className='w-260'>
      <thead>
        <tr>
          <th className='border p-3 bg-blue-500/20'>N <sup>0</sup></th>
          <th className='border p-3 bg-blue-500/20'>Spare Part</th>
          <th className='border p-3 bg-blue-500/20'>StockIn Quantity</th>
          <th className='border p-3 bg-blue-500/20'>StockIn Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stockin , index)=>{
          return (
            <tr key={stockin.id}>
              <td className='border p-3 bg-blue-800/20'>{index + 1}</td>
              <td className='border p-3 bg-blue-800/20'>{stockin.name}</td>
              <td className='border p-3 bg-blue-800/20'>{stockin.quantity}</td>
              <td className='border p-3 bg-blue-800/20'>{new Date(stockin.stockindate).toDateString('en')}</td>
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

export default Stockin
