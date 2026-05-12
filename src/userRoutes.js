import { element } from 'prop-types'
import React from 'react'
import UserPrivateRoute from './components/UserPrivateRoutes'
import { Navigate } from 'react-router-dom'
import Home from './views/user-views/Home'
import Register from './views/user-views/Auth/Register'

import StaticPage from './views/user-views/StaticPages'
import UserProfile from './views/user-views/UserProfile'
import Login from './views/user-views/Auth/Login'
import Signup from './views/user-views/Auth/Signup'
import ProductPage from './views/user-views/Components/ProductPage'
import SellerPage from './views/user-views/Components/SellerPage'
import SellerDetailPage from './views/user-views/Components/SellerDetailPage'
import ProductDetailsPage from './views/user-views/Components/ProductDetailsPage'
import CartList from './views/user-views/Components/CartList'
import CheckoutPage from './views/user-views/Components/CheckoutPage'
import CartRequest from './views/user-views/Components/CartRequest'

import Category from './views/user-views/Categories'
import Seller from './views/user-views/SellerDisplay'
import ProductList from './views/user-views/ProductList'
import ContactUs from './views/user-views/ContactUs'
import Faq from './views/user-views/Components/Faq'
import Homestaydetails from './views/user-views/Components/Homestaydetails'
import Ridesdetails from './views/user-views/Components/Ridesdetails'
import Rides from './views/user-views/Components/Rides'
import Food from './views/user-views/Components/Food'
import Fooddetails from './views/user-views/Components/Fooddetails'

const userRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/website',
    element: <Home />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/categories/:id',
    element: <ProductList />,
  },
  {
    path: '/homestaydetails/:id',
    element: <Homestaydetails />,
  },

  {
    path: '/sellers',
    element: <Seller />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
  },
  {
    path: '/faq',
    element: <Faq />,
  },
  // {
  //   path: '/admin-register',
  //   element: <AdminLogin />,
  // },
  {
    path: '/page/:slug',
    element: <StaticPage />,
  },
  {
    path: '/user-profile',
    element: (
      <UserPrivateRoute>
        <UserProfile />
      </UserPrivateRoute>
    ),
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/products',
    element: <ProductPage />,
  },
  // {
  //   path: '/product-details',
  //   element: <ProductDetailsPage />,
  // },
  {
    path: '/product-details/:id',
    element: <ProductDetailsPage />,
  },
  {
    path: '/rides',
    element: <Rides />,
  },
  {
    path: '/ridesdetails/:id',
    element: <Ridesdetails />,
  },
  {
    path: '/food',
    element: <Food />,
  },
  {
    path: '/fooddetails/:id',
    element: <Fooddetails />,
  },
  {
    path: '/sellers',
    element: <SellerPage />,
  },
  {
    path: '/seller-details/:id',
    element: <SellerDetailPage />,
  },
  {
    path: '/cart-list',
    element:
    <UserPrivateRoute>
    <CartList /></UserPrivateRoute>,
  },
  {
    path: '/check-out',
    element: <UserPrivateRoute><CheckoutPage /></UserPrivateRoute>,
  },
  {
    path: '/cart-request',
    element: <UserPrivateRoute><CartRequest /></UserPrivateRoute>,
  },

]

export default userRoutes
