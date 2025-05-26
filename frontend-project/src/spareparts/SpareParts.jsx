import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
function SpareParts() {
  const [data, setData] = useState([])
  useEffect(()=>{
  axios.get("http://localhost:2000/getallspareparts")
  .then((result)=>{
  setData(result.data)
  })
  }, [])
  return (
    <>
    <div>
      <div>
        <Link to='/addsparepart'>
        <button className='bg-green-500 mt-1 ml-2 rounded p-2'>Add Spare Part</button>
        </Link>
      </div>
      <div className='flex flex-col items-center'>
        <table className='w-300 mt-3'>
          <thead>
            <tr>
              <th className='border p-3 bg-white/30'>N <sup>0</sup></th>
              <th className='border p-3 bg-white/30'>Name</th>
              <th className='border p-3 bg-white/30'>Category</th>
              <th className='border p-3 bg-white/30'>Quantity</th>
              <th className='border p-3 bg-white/30'>Unit price</th>
              <th className='border p-3 bg-white/30'>Total price</th>
              <th className='border p-3 bg-white/30'>Status</th>
            </tr>
          </thead>
          <tbody>
         {data.length == 0 ? (
          <tr>
            <td className='border p-3 bg-black/50 text-center' colSpan={6}> No spare part recorded</td>
          </tr>
         ): (
          data.map((sparepart, index)=>{
            return (
              <tr key={sparepart.id}>
                <td className='border p-3 bg-black/20'> { index + 1}</td>
                <td className='border p-3 bg-black/20'> {sparepart.name}</td>
                <td className='border p-3 bg-black/20'> {sparepart.category}</td>
                <td className='border p-3 bg-black/20'> {sparepart.quantity}</td>
                <td className='border p-3 bg-black/20'> {sparepart.unitprice}</td>
                <td className='border p-3 bg-black/20'> {sparepart.totalprice}</td>
                <td className='border p-3 bg-black/20'> {sparepart.status}</td>
              </tr>
            )
          })
         )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default SpareParts
