import { createContext, useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import API from '../api'
import {
  loginSuccess,
  userLoginSuccess,
  sellerLoginSuccess,
  adminLogout as reduxAdminLogout,
  userLogout as reduxUserLogout,
  sellerLogout as reduxSellerLogout,
} from '../features/auth/authSlice'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [user, setUser] = useState(null)
  const [seller, setSeller] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const savedAdminToken = localStorage.getItem('admin_token')
    if (savedAdminToken) setAdmin(JSON.parse(savedAdminToken))

    const savedUserToken = localStorage.getItem('user_token')
    if (savedUserToken) setUser(JSON.parse(savedUserToken))

    const savedSellerToken = localStorage.getItem('seller_token')
    if (savedSellerToken) setSeller(JSON.parse(savedSellerToken))
  }, [])

  // ---------------------- SEND OTP -----------------------
  const sendUserOtp = async ({ phone = null }) => {
    try {
      if (!phone) {
        Swal.fire('', 'Please provide phone', 'warning')
        return false
      }

      const payload = { phone }

      const res = await API.post('/auth/send-otp', payload)



      // ✅ FIXED CONDITION
      if (res.data.status === 'success') {
        localStorage.setItem('temp_token', res.data.temporary_token)
        localStorage.setItem('phone', res.data.phone)
        localStorage.setItem('tempotp', res.data.otp) // dev only

        Swal.fire({
          icon: 'success',
          title: res.data.message,
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false,
        })

        return {
          success: true,
          otp: res.data.otp,
          token: res.data.temporary_token,
          phone: res.data.phone,
        }
      }

      // ❌ fallback (also fix type)
      Swal.fire('', res.data.message || 'Failed to send OTP', 'error')
      return false
    } catch (error) {
      console.error(error)

      Swal.fire('', error.response?.data?.message || 'Failed to send OTP', 'error')

      return false
    }
  }
  // ---------------------- USER LOGIN -----------------------
  const userLogin = async (credentials) => {
    try {
      if (!credentials.email || !credentials.password) {
        Swal.fire('', 'Please provide email and password', 'warning')
        return false
      }

      const res = await API.post('/user/login', credentials)

      if (res.status === 200) {
        const { user, token } = res.data.data

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('user_token', JSON.stringify(token))
        localStorage.setItem('user_profile', JSON.stringify(user))

        dispatch(userLoginSuccess({ user, token }))
        setUser(user)

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })

        return true
      } else {
        Swal.fire('', 'Something went wrong', 'error')
        return false
      }
    } catch (error) {
      Swal.fire('', error.response?.data?.message || 'Login failed', 'error')
      return false
    }
  }



   const userLoginByPasswors = async (credentials) => {
    try {
      if (!credentials.email || !credentials.password) {
        Swal.fire('', 'Please provide mobile number and password', 'warning')
        return false
      }

      const res = await API.post('/auth/login', credentials)

 if (res.data.status === 'success') {

      const user = res.data.user
      const token = res.data.token

      // ✅ STORE
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('user_token', token)
      localStorage.setItem('user_profile', JSON.stringify(user))

      dispatch(userLoginSuccess({ user, token }))
      setUser(user)

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 3000,
      })

      return true
    } else {
      Swal.fire('', res.data.message || 'Login failed', 'error')
      return false
    }

  } catch (error) {
    Swal.fire('', error.response?.data?.message || 'Login failed', 'error')
    return false
  }
}
  // ---------------------- USER REGISTER -----------------------
  const userRegister = async (data) => {
    try {
      if (!data.name || !data.email || !data.phone || !data.password || !data.confirmPassword) {
        Swal.fire('', 'All fields are required', 'warning')
        return false
      }

      if (data.password !== data.confirmPassword) {
        Swal.fire('', 'Passwords do not match', 'warning')
        return false
      }

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        dob: data.dob || null,
        gender: data.gender || null,
      }

      const res = await API.post('/user/register', payload)

      if (res.data.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        })

        // 🔥 Return the user & token to caller
        return {
          user: res.data.data.user,
          token: res.data.data.token,
        }
      }

      Swal.fire('', res.data.message || 'Something went wrong', 'error')
      return false
    } catch (error) {
      Swal.fire('', error.response?.data?.message || 'Registration failed', 'error')
      return false
    }
  }

  // ---------------------- SEND OTP -----------------------
 const sendOtp = async ({
  phone = null,
  email = null,
  f_name = null,
  password = null,
  customer_type = null,
  food_preference = null,
  hotel_preference = null,
  vehicle_preferences = []
}) => {
  try {
    if (!phone && !email) {
      Swal.fire('', 'Please provide phone or email', 'warning')
      return false
    }

    const payload = {
      phone,
      email,
      f_name,
      password,
      customer_type,

      food_preference:
        customer_type === "food" ? food_preference : null,

      hotel_preference:
        customer_type === "hotel" ? hotel_preference : null,

      vehicle_preferences:
        customer_type === "vehicle" ? vehicle_preferences : []
    }

    const res = await API.post('/auth/register', payload)

    if (res.data.status === 'otp_sent') {
      // ✅ STORE TOKEN
      localStorage.setItem('temp_token', res.data.temporary_token)
      localStorage.setItem('phone', res.data.phone)
      localStorage.setItem('tempotp', res.data.otp)

      Swal.fire({
        icon: 'success',
        title: res.data.message || 'OTP sent successfully',
        toast: true,
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false,
      })

      return {
        success: true,
        otp: res.data.otp,
        token: res.data.temporary_token,
        phone: res.data.phone,
      }
    }

    Swal.fire('', res.data.message || 'Failed to send OTP', 'error')
    return false

  } catch (error) {
    console.error(error)

    Swal.fire('', error.response?.data?.message || 'Failed to send OTP', 'error')

    return false
  }
}
  // ---------------------- VERIFY OTP -----------------------
  // ---------------------- VERIFY OTP -----------------------
  const verifyOtp = async ({ temporary_token, otp }) => {
    try {
      if (!otp) {
        Swal.fire('', 'OTP is required', 'warning')
        return false
      }

      const res = await API.post('/auth/verify-register-otp', {
        temporary_token,
        otp,
      })

      if (res.data.status === 'success') {
        const { user, token } = res.data

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('user_token', token)
        localStorage.setItem('user_profile', JSON.stringify(user))
        localStorage.removeItem('temp_token')

        // ✅ Redux
        dispatch(userLoginSuccess({ user, token }))
        setUser(user)

        Swal.fire({
          icon: 'success',
          title: res.data.message || 'OTP Verified. Login Successful',
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false,
        })

        return { user, token }
      }

      // ❌ fallback
      Swal.fire('', res.data.message || 'Invalid OTP', 'error')
      return false
    } catch (error) {
      Swal.fire('', error.response?.data?.message || 'OTP verification failed', 'error')

      return false
    }
  }

  const verifyuserOtp = async ({ temporary_token, otp }) => {
    try {
      if (!otp) {
        Swal.fire('', 'OTP is required', 'warning')
        return false
      }

      const res = await API.post('/auth/verify-otp', {
        temporary_token,
        otp,
      })

      if (res.data.status === 'success') {
        const { user, token } = res.data

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('user_token', token)
        localStorage.setItem('user_profile', JSON.stringify(user))
        localStorage.removeItem('temp_token')

        // ✅ Redux
        dispatch(userLoginSuccess({ user, token }))
        setUser(user)

        Swal.fire({
          icon: 'success',
          title: res.data.message || 'OTP Verified. Login Successful',
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false,
        })

        return { user, token }
      }

      // ❌ fallback
      Swal.fire('', res.data.message || 'Invalid OTP', 'error')
      return false
    } catch (error) {
      Swal.fire('', error.response?.data?.message || 'OTP verification failed', 'error')

      return false
    }
  }

  const userLogout = () => {
    localStorage.clear()
    localStorage.removeItem('user')
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_profile')
    setUser(null)
    dispatch(reduxUserLogout())
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        sendOtp,
        verifyOtp,
        sendUserOtp,
        verifyuserOtp,
        userLogin,
        userLoginByPasswors,
        userRegister,

        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
