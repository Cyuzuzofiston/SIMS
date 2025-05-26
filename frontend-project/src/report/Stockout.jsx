import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

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
    })}



     const handleDownload = () => {
        fetch('http://localhost:2000/download-stockoutreport')
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
      <div>
        <p className='text-center text-2xl font-bold'>Stock out Report</p>
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

export default Stockout
