import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Routing from './Routing'
import Header from './Header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const hideHeaderRoutes = ['/', '/register']
  const shouldShowHeader = isLoggedIn && !hideHeaderRoutes.includes(location.pathname)

  return (
    <div>
      {shouldShowHeader && (
        <div className='w-full bg-black h-20 text-white flex'>
          <Header />
        </div>
      )}
      <Routing />
    </div>
  )
}

export default App
