import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Stockin() {

    const [data, setData] = useState([])
  useEffect(()=>{
  axios.get("http://localhost:2000/getstockin")
  .then((result)=>{
    setData(result.data)
  })
  }, [])



     const handleDownload = () => {
        fetch('http://localhost:2000/download-stockinreport')
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
    <div><p className='text-center pt-6 font-bold' style={{fontSize:'19px'}}>Stock in Report</p></div>
  <div className='flex items-center flex-col'>
    <table className='w-260'>
      <thead>
        <tr>
          <th className='border p-3 bg-blue-800/20'>N <sup>0</sup></th>
          <th className='border p-3 bg-blue-800/20'>Spare Part</th>
          <th className='border p-3 bg-blue-800/20'>StockIn Quantity</th>
          <th className='border p-3 bg-blue-800/20'>StockIn Date</th>
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

export default Stockin
