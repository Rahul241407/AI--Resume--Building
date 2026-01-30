import React from 'react'
import LandingPage from './pages/LandingPage'
import {Routes,Route} from 'react-router-dom'
import UserProvider from './context/UserContext'
import Dashboard from './pages/Dashboard'

const app = () => {
  return (
    <>
    <UserProvider>
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>

    </UserProvider>
    

    </>
  )
}
export default app;