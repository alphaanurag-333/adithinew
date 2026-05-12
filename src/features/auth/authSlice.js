import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

const admin = JSON.parse(localStorage.getItem('admin'))
const user = JSON?.parse(localStorage.getItem('user'))
const adminToken = JSON.parse(localStorage.getItem('admin_token'))
const userToken = JSON.parse(localStorage.getItem('user_token'))
const seller = JSON.parse(localStorage.getItem('seller'))
const sellerToken = JSON.parse(localStorage.getItem('seller_token'))

let initialAllowedModules = []

if (adminToken) {
  try {
    const decoded = jwtDecode(adminToken)
    initialAllowedModules = decoded.allowedModules || []
  } catch (err) {
    initialAllowedModules = []
  }
}

const initialState = {
  admin: admin || null,
  user: user || null,
  adminToken: adminToken || null,
  userToken: userToken || null,
  isAdminAuthenticated: !!adminToken,
  isUserAuthenticated: !!userToken,
  allowedModules: initialAllowedModules,
  seller: seller || null,
  sellerToken: sellerToken || null,
  isSellerAuthenticated: !!sellerToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ---------------- ADMIN LOGIN ----------------
    loginSuccess: (state, action) => {
      state.admin = action.payload.user
      state.adminToken = action.payload.token
      state.allowedModules = action.payload.allowedModules || []
      state.isAdminAuthenticated = true

      localStorage.setItem('admin', JSON.stringify(action.payload.user))
      localStorage.setItem('admin_token', JSON.stringify(action.payload.token))
      localStorage.setItem('admin_profile', JSON.stringify(action.payload.user))
      // localStorage.setItem('allowed_modules', JSON.stringify(action.payload.allowedModules || []))
    },

    // ---------------- USER LOGIN ----------------
    userLoginSuccess: (state, action) => {
      state.user = action.payload.user
      state.userToken = action.payload.token
      state.isUserAuthenticated = true

      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('user_token', JSON.stringify(action.payload.token))
      localStorage.setItem('user_profile', JSON.stringify(action.payload.user))
    },

    sellerLoginSuccess: (state, action) => {
      state.seller = action.payload.user
      state.sellerToken = action.payload.token
      state.isSellerAuthenticated = true

      localStorage.setItem('seller', JSON.stringify(action.payload.user))
      localStorage.setItem('seller_token', JSON.stringify(action.payload.token))
      localStorage.setItem('seller_profile', JSON.stringify(action.payload.user))
    },

    // ---------------- UPDATE PROFILES ----------------
    updateProfile: (state, action) => {
      state.admin = action.payload
      localStorage.setItem('admin', JSON.stringify(action.payload))
    },

    updateUserProfile: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },

    updateSellerProfile: (state, action) => {
      state.seller = action.payload
      localStorage.setItem('seller', JSON.stringify(action.payload))
    },

    // ---------------- LOGOUTS ----------------
    adminLogout: (state) => {
      state.admin = null
      state.adminToken = null
      state.isAdminAuthenticated = false
      state.allowedModules = []

      localStorage.removeItem('admin')
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_profile')
      localStorage.removeItem('allowed_modules')
    },

    userLogout: (state) => {
      state.user = null
      state.userToken = null
      state.isUserAuthenticated = false

      localStorage.removeItem('user')
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_profile')
    },

    sellerLogout: (state) => {
      state.seller = null
      state.sellerToken = null
      state.isSellerAuthenticated = false

      localStorage.removeItem('seller')
      localStorage.removeItem('seller_token')
      localStorage.removeItem('seller_profile')
    },
  },
})

export const {
  loginSuccess,
  userLoginSuccess,
  sellerLoginSuccess,
  updateProfile,
  updateUserProfile,
  updateSellerProfile,
  adminLogout,
  userLogout,
  sellerLogout,
} = authSlice.actions

export default authSlice.reducer
