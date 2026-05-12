import React, { useState, useEffect } from 'react'
import LoginIMg from '../../../assets/images/mianLogo200.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const Login = () => {
  const navigate = useNavigate()
  const { sendUserOtp, verifyuserOtp, userLoginByPasswors } = useAuth()
  const { user, userToken } = useSelector((state) => state.auth)

  const [testOtp, setTestOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
const [timer, setTimer] = useState(0)
  // 🔹 Toggle login type
  const [loginType, setLoginType] = useState('otp')

  // ---------------- OTP LOGIN ----------------
  const [mobileLogin, setMobileLogin] = useState({
    phone: '',
    otp: '',
  })

  // ---------------- PASSWORD LOGIN ----------------
  const [passwordLogin, setPasswordLogin] = useState({
    phone: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const [, setShowForgot] = useState(false)

const [forgotData, setForgotData] = useState({
  phone: '',
  otp: '',
  newPassword: '',
})
const [otpSentForgot, setOtpSentForgot] = useState(false)
  // Redirect if logged in
  useEffect(() => {
    if (user && userToken) {
      navigate('/home')
    }
  }, [user, userToken, navigate])

  // Reset when switching login type
  useEffect(() => {
    setOtpSent(false)
    setMobileLogin({ phone: '', otp: '' })
    setPasswordLogin({ phone: '', password: '' })
  }, [loginType])

  useEffect(() => {
  let interval

  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
  }

  return () => clearInterval(interval)
}, [timer])
  // ================= OTP SEND =================
 const handleSendOtp = async () => {
  if (timer > 0) return // 🚫 prevent spam

  if (!mobileLogin.phone.trim()) {
    Swal.fire('', 'Please enter whatsapp number', 'warning')
    return
  }

  if (mobileLogin.phone.length !== 10) {
    Swal.fire('', 'Whatsapp number must be 10 digits', 'warning')
    return
  }

  const res = await sendUserOtp({
    phone: mobileLogin.phone,
  })

  if (res) {
    setOtpSent(true)
    setTestOtp(res.otp)
    setTimer(60) // ⏱ start timer
  }
}

  // ================= OTP VERIFY =================
  const handleOtpLogin = async (e) => {
    e.preventDefault()

    if (!mobileLogin.otp) {
      Swal.fire('', 'Enter OTP', 'warning')
      return
    }

    const res = await verifyuserOtp({
      temporary_token: localStorage.getItem('temp_token'),
      otp: mobileLogin.otp,
    })

    if (res) navigate('/home')
  }

  // ================= PASSWORD LOGIN =================
  const handlePasswordLogin = async (e) => {
    e.preventDefault()

    if (!passwordLogin.phone || passwordLogin.phone.length !== 10) {
      Swal.fire('', 'Enter valid mobile number', 'warning')
      return
    }

    if (!passwordLogin.password) {
      Swal.fire('', 'Enter password', 'warning')
      return
    }

    const res = await userLoginByPasswors({
      email: passwordLogin.phone,
      password: passwordLogin.password,
    })

    if (res) navigate('/home')
  }

  return (
    <section className="commonLoginSection login-page login-section-bg">
      <div className="container userAuthDiv login-shell">
        <div className="auth-page-top-bar">
          <NavLink to="/home">Back to Home</NavLink>
        </div> 

        {/* LEFT IMAGE */}
        <div className="col-md-6 p-0 p-md-4 ">
          <div className="adminImgDiv d-flex login-illustration-wrap">
            <img
              className="mobileHide shadow-n login-illustration"
              src={LoginIMg}
              alt="Homestays, home-style food, and rides on Atithi Devo Bhava"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6 p-3 p-md-4 login-form-col">
          <div className="userWelcomeMsg login-welcome">
            {/* <span className="login-welcome-badge">Secure Access</span> */}
            <h6>Welcome Back!</h6>
            <p>Login to your Athiti account and continue your journey.</p>
          </div>

          <div className="registerCard mt-2 pb-0 login-card login-card-surface">
            {/* 🔹 TOGGLE */}
            <div className="d-flex gap-2 mb-3 justify-content-center flex-wrap login-toggle-wrap" role="tablist">
              <button
                type="button"
                className={`btn login-toggle-btn ${loginType === 'otp' ? 'login-toggle-btn-active' : ''}`}
                onClick={() => setLoginType('otp')}
              >
                Login With OTP
              </button>

              <button
                type="button"
                className={`btn login-toggle-btn ${loginType === 'password' ? 'login-toggle-btn-active' : ''}`}
                onClick={() => setLoginType('password')}
              >
                Login With Password
              </button>
            </div>

            <form
              className="inputForm UserSignupForm px-0 login-form"
              onSubmit={(e) => {
                if (loginType === 'otp') {
                  if (!otpSent) {
                    e.preventDefault()
                    handleSendOtp()
                  } else {
                    handleOtpLogin(e)
                  }
                } else {
                  handlePasswordLogin(e)
                }
              }}
            >
              {/* ================= OTP LOGIN ================= */}
              {loginType === 'otp' && (
                <>
                  <div className="themeInput mb-1 login-input-row">
                    <label>
                      Whatsapp Number<small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={mobileLogin.phone}
                      readOnly={otpSent}
                      onChange={(e) =>
                        setMobileLogin({
                          ...mobileLogin,
                          phone: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      placeholder="Enter whatsapp number"
                    />
                  </div>

                  {!otpSent && (
                    <div className="UserFormBtn">
                      <button type="button" onClick={handleSendOtp}>
                        Send OTP
                      </button>
                    </div>
                  )}

                  {otpSent && (
                    <>
                      <div className="themeInput mt-3 login-input-row">
                        <label>
                          OTP<small className="text-danger">*</small>
                          <span className="login-test-otp">Test OTP: {testOtp}</span>
                        </label>
                        <input
                          type="text"
                          maxLength="4"
                          value={mobileLogin.otp}
                          onChange={(e) =>
                            setMobileLogin({
                              ...mobileLogin,
                              otp: e.target.value.replace(/\D/g, ''),
                            })
                          }
                          placeholder="Enter OTP"
                        />
                        {/* <small className="text-danger">Test OTP: {testOtp}</small> */}
                      </div>
                      <div className="text-center mt-2 login-resend-wrap">
                        {timer > 0 ? (
                          <small className="text-muted fw-semibold">
                            Resend OTP in {timer}s
                          </small>
                        ) : (
                          <small
                            className="colortex fw-semibold login-resend-btn"
                            onClick={handleSendOtp}
                          >
                            Resend OTP
                          </small>
                        )}
                      </div>

                      <div className="UserFormBtn">
                        <button type="submit">Login</button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* ================= PASSWORD LOGIN ================= */}
              {loginType === 'password' && (
                <>
                  <div className="themeInput mb-1 login-input-row">
                    <label>
                      Whatsapp Number<small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={passwordLogin.phone}
                      onChange={(e) =>
                        setPasswordLogin({
                          ...passwordLogin,
                          phone: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      placeholder="Enter whatsapp number"
                    />
                  </div>

                  <div className="themeInput mt-2 login-input-row">
                    <label>
                      Password<small className="text-danger">*</small>{' '}
                      <a
                        className="active login-forgot-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowForgot(true)
                          setLoginType('forgot')
                        }}
                      >
                        Forget Password
                      </a>
                    </label>

                    <div className="position-relative">
                    <input
  maxLength={14}
  minLength={6}
  type={showPassword ? 'text' : 'password'}
  autoComplete="off"
  value={passwordLogin.password}
  onChange={(e) =>
    setPasswordLogin({
      ...passwordLogin,
      password: e.target.value.replace(/^\s+/, ''),
    })
  }
  placeholder="Enter password"
/>

                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                      </span>
                    </div>
                  </div>

                  <div className="UserFormBtn mt-2">
                    <button type="submit">Login</button>
                  </div>
                </>
              )}

{loginType === 'forgot' && (
  <div className="login-forgot-box">

    <h6 className="mb-2">Reset Password</h6>

    {/* PHONE */}
     <div className="themeInput mb-1 login-input-row">
                    <label>
                      Whatsapp Number<small className="text-danger">*</small>
                    </label>
      <input
        type="text"
        placeholder="Enter your whatsapp number"
        maxLength={10}
        value={forgotData.phone}
        onChange={(e) =>
          setForgotData({
            ...forgotData,
            phone: e.target.value.replace(/\D/g, ''),
          })
        }
      />
    </div>

    {/* SEND OTP */}
    {!otpSentForgot && (
      <div className='UserFormBtn'>
      <button
        className=" mb-2"
        onClick={() => {
          if (forgotData.phone.length !== 10) {
            Swal.fire('', 'Enter valid number', 'warning')
            return
          }
          setOtpSentForgot(true)
          Swal.fire('', 'OTP Sent (demo)', 'success')
        }}
      >
        Send OTP
      </button>
      </div>
    )}

    {/* OTP + NEW PASSWORD */}
    {otpSentForgot && (
      <>
        <div className="themeInput mb-2 login-input-row">
           <label>OTP<small className='text-danger'>*</small></label>
          <input
  type="text"
  placeholder="Enter OTP"
  maxLength={4}
  value={forgotData.otp}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, '') // only numbers
    if (value.length <= 4) {
      setForgotData({
        ...forgotData,
        otp: value,
      })
    }
  }}
  inputMode="numeric"
  pattern="[0-9]*"
/>
        </div>

        <div className="themeInput mb-2 login-input-row">
           <label>Password<small className='text-danger'>*</small></label>
          <input maxLength={14} minLength={6}
            type="password"
            placeholder="Enter new password"
            onChange={(e) =>
              setForgotData({
                ...forgotData,
                newPassword: e.target.value,
              })
            } required
          />
        </div>

 <div className='UserFormBtn'>
        <button
          className=" w-100"
          onClick={() => {
            if (!forgotData.otp || !forgotData.newPassword) {
              Swal.fire('', 'Fill all fields', 'warning')
              return
            }

            Swal.fire('', 'Password Reset Successful', 'success')
            setShowForgot(false)
            setOtpSentForgot(false)
          }}
        >
          Reset Password
        </button>
        </div>
      </>
    )}
  </div>
)}
              <p className="mt-3 login-signup-text">
                Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

// import React, { useState, useEffect } from 'react'
// import LoginIMg from '../../../assets/webImage/loginImg.png'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../context/AuthContext'
// import { useSelector } from 'react-redux'
// import Swal from 'sweetalert2'
// import { VscEye, VscEyeClosed } from 'react-icons/vsc'

// const Login = () => {
//   const navigate = useNavigate()
//   const { sendUserOtp, verifyuserOtp, userLogin, userLoginByPasswors } = useAuth()
//   const { user, userToken } = useSelector((state) => state.auth)

//   const [testOtp, setTestOtp] = useState('')
//   const [otpSent, setOtpSent] = useState(false)

//   // 🔹 Toggle login type
//   const [loginType, setLoginType] = useState('otp')

//   // ---------------- OTP LOGIN ----------------
//   const [mobileLogin, setMobileLogin] = useState({
//     phone: '',
//     otp: '',
//   })

//   // ---------------- PASSWORD LOGIN ----------------
//   const [passwordLogin, setPasswordLogin] = useState({
//     phone: '',
//     password: '',
//   })

//   const [showPassword, setShowPassword] = useState(false)

//   // Redirect if logged in
//   useEffect(() => {
//     if (user && userToken) {
//       navigate('/home')
//     }
//   }, [user, userToken, navigate])

//   // Reset when switching login type
//   useEffect(() => {
//     setOtpSent(false)
//     setMobileLogin({ phone: '', otp: '' })
//     setPasswordLogin({ phone: '', password: '' })
//   }, [loginType])

//   // ================= OTP SEND =================
//   const handleSendOtp = async () => {
//     if (!mobileLogin.phone.trim()) {
//       Swal.fire('', 'Please enter whatsapp number', 'warning')
//       return
//     }

//     if (mobileLogin.phone.length !== 10) {
//       Swal.fire('', 'Whatsapp number must be 10 digits', 'warning')
//       return
//     }

//     const res = await sendUserOtp({
//       phone: mobileLogin.phone,
//     })

//     if (res) {
//       setOtpSent(true)
//       setTestOtp(res.otp)
//     }
//   }

//   // ================= OTP VERIFY =================
//   const handleOtpLogin = async (e) => {
//     e.preventDefault()

//     if (!mobileLogin.otp) {
//       Swal.fire('', 'Enter OTP', 'warning')
//       return
//     }

//     const res = await verifyuserOtp({
//       temporary_token: localStorage.getItem('temp_token'),
//       otp: mobileLogin.otp,
//     })

//     if (res) navigate('/home')
//   }

//   // ================= PASSWORD LOGIN =================
//   const handlePasswordLogin = async (e) => {
//     e.preventDefault()

//     if (!passwordLogin.phone || passwordLogin.phone.length !== 10) {
//       Swal.fire('', 'Enter valid mobile number', 'warning')
//       return
//     }

//     if (!passwordLogin.password) {
//       Swal.fire('', 'Enter password', 'warning')
//       return
//     }

//     const res = await userLoginByPasswors({
//       email: passwordLogin.phone,
//       password: passwordLogin.password,
//     })

//     if (res) navigate('/home')
//   }

//   return (
//     <section className="commonLoginSection">
//       <div className="container userAuthDiv">
//         {/* LEFT IMAGE */}
//         <div className="col-md-6 p-4">
//           <div className="adminImgDiv d-flex">
//             <img className="mobileHide shadow-n" src={LoginIMg} alt="Login" />
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="col-md-6 p-4">
//           <div className="userWelcomeMsg">
//             <h6>Welcome Back!</h6>
//             <p>Login to your Atithi account</p>
//           </div>

//           <div className="registerCard mt-2 pb-0">
//             {/* 🔹 TOGGLE */}
//             <div className="d-flex gap-2 mb-2 justify-content-center">
//               <button
//                 type="button"
//                 className={`btn activebuttonb activebuttons ${loginType === 'otp' ? 'btn-secondary activebutton' : 'btn-outline-dark'}`}
//                 onClick={() => setLoginType('otp')}
//               >
//                 Login With OTP
//               </button>

//               <button
//                 type="button"
//                 className={`btn activebuttonb activebuttons ${loginType === 'password' ? 'btn-dark activebutton' : 'btn-outline-dark'}`}
//                 onClick={() => setLoginType('password')}
//               >
//                 Login With Password
//               </button>
//             </div>

//             <form
//               className="inputForm UserSignupForm px-0"
//               onSubmit={(e) => {
//                 if (loginType === 'otp') {
//                   if (!otpSent) {
//                     e.preventDefault()
//                     handleSendOtp()
//                   } else {
//                     handleOtpLogin(e)
//                   }
//                 } else {
//                   handlePasswordLogin(e)
//                 }
//               }}
//             >
//               {/* ================= OTP LOGIN ================= */}
//               {loginType === 'otp' && (
//                 <>
//                   <div className="themeInput mb-1">
//                     <label>
//                       Whatsapp Number<small className="text-danger">*</small>
//                     </label>
//                     <input
//                       type="text"
//                       maxLength={10}
//                       value={mobileLogin.phone}
//                       readOnly={otpSent}
//                       onChange={(e) =>
//                         setMobileLogin({
//                           ...mobileLogin,
//                           phone: e.target.value.replace(/\D/g, ''),
//                         })
//                       }
//                       placeholder="Enter whatsapp number"
//                     />
//                   </div>

//                   {!otpSent && (
//                     <div className="UserFormBtn">
//                       <button type="button" onClick={handleSendOtp}>
//                         Send OTP
//                       </button>
//                     </div>
//                   )}

//                   {otpSent && (
//                     <>
//                       <div className="themeInput mt-3">
//                         <label>OTP*</label>
//                         <input
//                           type="text"
//                           maxLength="4"
//                           value={mobileLogin.otp}
//                           onChange={(e) =>
//                             setMobileLogin({
//                               ...mobileLogin,
//                               otp: e.target.value.replace(/\D/g, ''),
//                             })
//                           }
//                           placeholder="Enter OTP"
//                         />
//                         <small className="text-danger">Test OTP: {testOtp}</small>
//                       </div>

//                       <div className="UserFormBtn">
//                         <button type="submit">Login</button>
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}

//               {/* ================= PASSWORD LOGIN ================= */}
//               {loginType === 'password' && (
//                 <>
//                   <div className="themeInput mb-1">
//                     <label>
//                       Whatsapp Number<small className="text-danger">*</small>
//                     </label>
//                     <input
//                       type="text"
//                       maxLength={10}
//                       value={passwordLogin.phone}
//                       onChange={(e) =>
//                         setPasswordLogin({
//                           ...passwordLogin,
//                           phone: e.target.value.replace(/\D/g, ''),
//                         })
//                       }
//                       placeholder="Enter whatsapp number"
//                     />
//                   </div>

//                   <div className="themeInput mt-2">
//                     <label>
//                       Password<small className="text-danger">*</small>{' '}
//                       <a
//                         aria-current="page"
//                         class="float-end active"
//                         href="/login"
//                         data-discover="true"
//                       >
//                         Forget Password
//                       </a>
//                     </label>

//                     <div className="position-relative">
//                       <input
//                         maxLength={14}
//                         minLength={6}
//                         type={showPassword ? 'text' : 'password'}
//                         value={passwordLogin.password}
//                         onChange={(e) =>
//                           setPasswordLogin({
//                             ...passwordLogin,
//                             password: e.target.value,
//                           })
//                         }
//                         placeholder="Enter password"
//                       />

//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         style={{
//                           position: 'absolute',
//                           right: '10px',
//                           top: '50%',
//                           transform: 'translateY(-50%)',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         {showPassword ? <VscEye /> : <VscEyeClosed />}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="UserFormBtn mt-2">
//                     <button type="submit">Login</button>
//                   </div>
//                 </>
//               )}

//               <p className="mt-2">
//                 Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Login

// import React, { useState, useEffect } from 'react'
// import LoginIMg from '../../../assets/webImage/loginImg.png'
// import { mainLogo } from '../../user-views/Image'

// import { NavLink, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../context/AuthContext'
// import { useSelector } from 'react-redux'
// import Swal from 'sweetalert2'
// import { VscEye, VscEyeClosed } from 'react-icons/vsc'

// const Login = () => {
//   const navigate = useNavigate()
//   const { sendOtp,sendUserOtp, verifyOtp, userLogin ,verifyuserOtp} = useAuth()
//   const { user, userToken } = useSelector((state) => state.auth)
//   const [testOtp, setTestOtp] = useState('')

//   // ---------------- MOBILE LOGIN ----------------
//   const [mobileLogin, setMobileLogin] = useState({
//     phone: '',
//     otp: '',
//   })

//   const [otpSent, setOtpSent] = useState(false)

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user && userToken) {
//       navigate('/home')
//     }
//   }, [user, userToken, navigate])

//   // Reset OTP when switching tabs
//   useEffect(() => {
//     setOtpSent(false)
//     setMobileLogin({ phone: '', otp: '' })
//   }, [])

//   // ================== SEND OTP ==================
//   const handleSendOtp = async () => {
//     if (!mobileLogin.phone.trim()) {
//       Swal.fire('', 'Please enter mobile number', 'warning')
//       return
//     }
//     if (mobileLogin.phone.trim().length !== 10) {
//       Swal.fire('', 'Mobile number must be 10 digits', 'warning')
//       return
//     }

//     const res = await sendUserOtp({
//       phone: mobileLogin.phone,

//     })

//     if (res) {
//       setOtpSent(true)
//       setTestOtp(res.otp)

//     }
//   }

//   // ================== VERIFY OTP (LOGIN) ==================
//   const handleOtpLogin = async (e) => {
//     e.preventDefault()

//     if (!mobileLogin.otp) {
//       Swal.fire('', 'Please enter OTP', 'warning')
//       return
//     }

//     const res = await verifyuserOtp({
//       temporary_token: localStorage.getItem('temp_token'),
//       otp: mobileLogin.otp,

//     })

//     if (res) navigate('/home')
//   }

//   return (
//     <>
//       <section className="commonLoginSection">
//         <div className="container userAuthDiv">
//           <div className="col-md-6 p-4">
//             <div className="adminImgDiv d-flex">
//               <img className="mobileHide shadow-n" src={LoginIMg} alt="Signup" />
//             </div>
//           </div>

//           <div className="col-md-6 p-4 my-auto ps-0">
//             <div className="userWelcomeMsg">
//               {/* <img className="userLogo mb-2" src={mainLogo} alt="Logo" /> */}
//               <h6>Welcome Back!</h6>
//               <p>Login with phone number in to your Atithi account</p>
//             </div>
//             <div className="registerCard mt-2 pb-0">

//               <div className="tab-content">

//                 <div id="mobile-login" className="tab-pane fade show active">
//                   <form
//                     className="inputForm UserSignupForm px-0"
//                     onSubmit={(e) => {
//                       e.preventDefault()
//                       if (!otpSent) {
//                         handleSendOtp()
//                       } else {
//                         handleOtpLogin(e)
//                       }
//                     }}
//                   >
//                     <div className="themeInput mb-1">
//                       <label>
//                         Mobile Number<small className="text-danger">*</small>
//                       </label>
//                       <input
//                         type="text"
//                         maxLength={10}
//                         minLength={10}
//                         value={mobileLogin.phone}
//                         readOnly={otpSent}
//                         onChange={(e) =>
//                           setMobileLogin({
//                             ...mobileLogin,
//                             phone: e.target.value.replace(/\D/g, ''),
//                           })
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter' && !otpSent) {
//                             e.preventDefault()
//                             handleSendOtp()
//                           }
//                         }}
//                       placeholder='Enter mobile number' />
//                     </div>

//                     {!otpSent && (
//                       <div className="UserFormBtn">
//                         <button type="button" onClick={handleSendOtp}>
//                           Send OTP
//                         </button>
//                       </div>
//                     )}

//                     {otpSent && (
//                       <>
//                         <div className="themeInput mb-1 mt-3">
//                           <label>
//                             OTP <small className="text-danger">*</small>
//                           </label>
//                           <input
//                             type="text"
//                             maxLength="4"
//                             value={mobileLogin.otp}
//                             onChange={(e) =>
//                               setMobileLogin({
//                                 ...mobileLogin,
//                                 otp: e.target.value.replace(/\D/g, ''),
//                               })
//                             }
//                            placeholder='Enter otp'/>
//                           <small className="text-danger">Test OTP: {testOtp}</small>
//                         </div>

//                         <div className="UserFormBtn">

//                           <button type="submit">Login</button>
//                         </div>
//                       </>
//                     )}
//                     <p>
//                       Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
//                     </p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Login
