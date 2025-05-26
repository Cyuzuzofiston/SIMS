// Header.jsx
import React from 'react'
import { Link, useNavigate,NavLink } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/');
  }

  return (
    <div className='items-center' style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
      <h1 className='bg-white text-black text-2xl font-bold w-80 pl-5 rounded-2xl'>Stock Inventory Management System</h1>
<NavLink
  to='/sparepart'
  className={({ isActive }) =>
    `pt-2 h-10 p-1 rounded w-29 text-center ${isActive ? 'bg-green-500' : 'focus:text-amber-300 focus:font-bold bg-white/30'}`
  }>
  Spare Parts
</NavLink>

<NavLink
  to='/stockin'
  className={({ isActive }) =>
    `pt-2 h-10 p-1 rounded w-29 text-center  ${isActive ? 'bg-green-500' : 'focus:text-amber-300 focus:font-bold bg-white/30'}`
  }
>
  Stock In
</NavLink>

<NavLink
  to='/stockout'
  className={({ isActive }) =>
    `pt-2 h-10 p-1 rounded w-29 text-center  ${isActive ? 'bg-green-500' : 'focus:text-amber-300 focus:font-bold bg-white/30'}`
  }
>
  Stock Out
</NavLink>

<NavLink
  to='/report'
  className={({ isActive }) =>
    `pt-2 h-10 p-1 rounded w-29 text-center  ${isActive ? 'bg-green-500' : 'focus:text-amber-300 focus:font-bold bg-white/30'}`
  }
>
  Reports
</NavLink>
      <button onClick={handleLogout} className='bg-red-600 hover:bg-red-800 h-10 px-4 rounded'>Logout</button>
    </div>
  )
}

export default Header
