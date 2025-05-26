import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Sparepart() {
    
      const [data, setData] = useState([])
  useEffect(()=>{
  axios.get("http://localhost:2000/getallspareparts")
  .then((result)=>{
  setData(result.data)
  })
  }, [])




     const handleDownload = () => {
        fetch('http://localhost:2000/download-sparepartreport')
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'report.xlsx';
                a.click();
            })
            .catch(err => alert("Download failed: " + err.message));
    };



  return (
     <>
    <div>
        <p className='text-center text-[20px] pt-2'>Spare Part Report</p>
      <div className='flex flex-col items-center'>
        <table className='w-300 mt-3'>
          <thead>
            <tr>
              <th className='border p-3 bg-black/30'>N <sup>0</sup></th>
              <th className='border p-3 bg-black/30'>Name</th>
              <th className='border p-3 bg-black/30'>Category</th>
              <th className='border p-3 bg-black/30'>Quantity</th>
              <th className='border p-3 bg-black/30'>Unit price</th>
              <th className='border p-3 bg-black/30'>Total price</th>
              <th className='border p-3 bg-black/30'>Status</th>
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
                <td className='border p-3 '> { index + 1}</td>
                <td className='border p-3 '> {sparepart.name}</td>
                <td className='border p-3 '> {sparepart.category}</td>
                <td className='border p-3 '> {sparepart.quantity}</td>
                <td className='border p-3 '> {sparepart.unitprice}</td>
                <td className='border p-3 '> {sparepart.totalprice}</td>
                <td className='border p-3 '> {sparepart.status}</td>
              </tr>
            )
          })
         )}
          </tbody>
        </table>
        <div className='mt-5'>
            <button onClick={handleDownload} className='bg-green-600 text-white px-4 py-2 rounded'>
                Download Excel Report
            </button>
            </div>

      </div>
    </div>
    </>
  )
}

export default Sparepart
