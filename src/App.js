import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import 'katex/dist/katex.min.css'
import './scss/style.scss'
import './scss/examples.scss'
import './assets/website.css'
import './assets/user-site.css'
import './assets/admin.css'
import './assets/responsive.css'

import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import { useDispatch } from 'react-redux'
import { setAppConfig } from './features/appConfigSlice'
import { useSelector } from 'react-redux'
import API from './api'
import Snowfall from 'react-snowfall'
import { FaCarRear, FaUtensils, FaWhatsapp } from 'react-icons/fa6'
// Layouts
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const UserLayout = React.lazy(() => import('./layout/UserLayout'))






const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

import {
  FiHome,
  FiCoffee,
  FiTruck,
  FiUser
} from "react-icons/fi";

import { FaHouseChimney } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const App = () => {
 
  // const { config } = useSelector((state) => state.appConfig)

 

  const dispatch = useDispatch()

  const fetchAppSettings = async () => {
   

    
      try {
        const res = await API.get('/config')

        if (res?.data) {
         
          dispatch(setAppConfig(res.data))
          return
        }
      } catch (err) {
        if (err?.response?.status && err.response.status !== 404) {
          return
        }
      }
    
  }
  useEffect(() => {
    fetchAppSettings()
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense>
          <Routes>




            <Route path="/*" element={<UserLayout />} />
          </Routes>
          <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noreferrer"
      className="whatsappFloat"
    >
      <FaWhatsapp />
    </a>
    {/* MOBILE STICKY NAV */}

<div className="mobileBottomNav">

<Link to="/" className="mobileNavItem active">
  <FiHome />
  <span>Home</span>
</Link>

<Link to="/" className="mobileNavItem">
  <FaHouseChimney />
  <span>Stay</span>
</Link>

<Link to="/" className="mobileNavItem">
<FaUtensils />
  <span>Food</span>
</Link>

<Link to="/" className="mobileNavItem">
  <FaCarRear />
  <span>Ride</span>
</Link>

<Link to="/user-profile" className="mobileNavItem">
  <FiUser />
  <span>Account</span>
</Link>

</div>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
