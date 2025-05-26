import React from 'react'
import {Link} from 'react-router-dom'

function Report() {
  return (
    <>
    <div className='flex flex-col items-center'>
      <div>
        <p className='text-center pt-2 font-bold text-3xl' > Stock Inventory Management System Report </p>
        </div>
        <div className='flex flex-col items-center gap-10 pt-30'>
          <Link to='/sparepartreport' className='text-[20px]'>
          <button className='bg-green-400/40 w-35 rounded-sm'>Spare parts</button>
          </Link>
          <Link to='/stockinreport' className='text-[20px]' >
          <button className='bg-green-400/40 w-35 rounded-sm'>Stock in</button>
          </Link>
          <Link to='/stockoutreport' className='text-[20px]'>
          <button  className='bg-green-400/40 w-35 rounded-sm'>Stock Out</button>
          </Link>
        </div>
    </div>
    </>
  )
}

export default Report
