// Routing.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MemberLogin from './MemberLogin'
import MemberRegister from './MemberRegister'
import ProtectedRoute from './ProtectedRoute'
import SpareParts from './spareparts/SpareParts'
import Stockin from './stockin/Stockin'
import Stockout from './stockout/Stockout'
import Report from './report/Report'
import Addsparepart from './spareparts/Addsparepart'
import Addstockin from './stockin/Addstockin'
import Addstockout from './stockout/Addstockout'
import Updatestockout from './stockout/Updatestockout'
import Sparepartreport from './report/Sparepart'
import Stockinreport from './report/Stockin'
import Stockoutreport from './report/Stockout'


function Routing() {
  return (
    <Routes>
      <Route path='/' element={<MemberLogin />} />
      <Route path='/register' element={<MemberRegister />} />
      <Route path='/sparepart' element={<ProtectedRoute><SpareParts /> </ProtectedRoute>} />
      <Route  path='/stockin'  element={  <ProtectedRoute><Stockin /></ProtectedRoute> } />
      <Route  path='/stockout' element={ <ProtectedRoute> <Stockout /> </ProtectedRoute>} />
      <Route  path='/report' element={  <ProtectedRoute>    <Report /></ProtectedRoute>} />
      <Route path='/addsparepart'  element={<ProtectedRoute> <Addsparepart  /></ProtectedRoute> } />
      <Route path='/addstockin'  element={<ProtectedRoute> <Addstockin  /></ProtectedRoute> } />
      <Route path='/addstockout'  element={<ProtectedRoute> <Addstockout  /></ProtectedRoute> } />
      <Route path='/update/:id'  element={<ProtectedRoute> <Updatestockout  /></ProtectedRoute> } />
      <Route path='/sparepartreport'  element={<ProtectedRoute> <Sparepartreport  /></ProtectedRoute> } />
      <Route path='/stockinreport'  element={<ProtectedRoute> <Stockinreport  /></ProtectedRoute> } />
      <Route path='/stockoutreport'  element={<ProtectedRoute> <Stockoutreport  /></ProtectedRoute> } />
    </Routes>
  )
}

export default Routing
