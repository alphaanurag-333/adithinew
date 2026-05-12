import React, { useState, useEffect } from 'react'
// import  SignupImg   from '../../assets/images/signupImg.png'
import { useAuth } from '../../../context/AuthContext'
import { userLoginSuccess } from '../../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
const Register = () => {
  const { user, userToken } = useSelector((state) => state.auth)

  const { userLogin, userRegister } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  useEffect(() => {
    if (user != null && userToken != null) {
      navigate('/home')
    }
  }, [user, userToken, navigate])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await userLogin(loginData)
      if (result) {
        navigate('/home')
      }
    } catch (error) {

    }
  }
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const result = await userRegister(signupData)
      if (result) {
        dispatch(userLoginSuccess({ user: result.user, token: result.token }))
        setSignupData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        })
        navigate('/home')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.message || 'Something went wrong!',
      })
    }
  }
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
  })

  return (
    <>
      <section className="commonSection">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              {/* <img src={SignupImg} /> */}
            </div>
            <div className="col-md-5">
              <div className="registerCard">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <button className="active" data-bs-target="#login" data-bs-toggle="pill">
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button data-bs-target="#signup" data-bs-toggle="pill">
                      Signup
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* LOGIN */}
                  <div id="login" className="tab-pane fade show active">
                    <form className="inputForm" onSubmit={handleLogin}>
                      <div className="themeInput">
                        <label>
                          Email Address <small className="text-danger">*</small>
                        </label>
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                      </div>

                      <div className="themeInput">
                        <label>
                          Password <small className="text-danger">*</small>
                        </label>
                        <input
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                      </div>

                      <div className="formBtn">
                        <button type="submit">Sign In</button>
                      </div>
                    </form>
                  </div>
                  {/* SIGNUP */}
                  <div id="signup" className="tab-pane fade">
                    <form className="inputForm" onSubmit={handleSignup}>
                      <div className="themeInput">
                        <label>
                          Name <small className={`text-danger`}>*</small>
                        </label>
                        <input
                          type="text"
                          minLength={3}
                          maxLength={40}
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value.replace(/[^a-zA-Z\s]/g, ''),
                            })
                          }
                          onBlur={() => setTouched({ ...touched, name: true })}
                        />
                        {touched.name && signupData.name.trim().length < 3 ? (
                          <span className="text-danger">
                            Name must be at least 3 characters long.
                          </span>
                        ) : null}
                      </div>

                      <div className="themeInput">
                        <label>
                          Email Address<small className="text-danger">*</small>
                        </label>
                        <input
                          type="email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          onBlur={() => setTouched({ ...touched, email: true })}
                        />
                      </div>
                      {touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(signupData.email) ? (
                        <span className="text-danger">Invalid email address.</span>
                      ) : null}

                      <div className="themeInput">
                        <label>
                          Phone Number <small className="text-danger">*</small>
                        </label>
                        <input
                          type="text"
                          minLength={10}
                          maxLength={10}
                          value={signupData.phone}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              phone: e.target.value.replace(/\D/g, ''),
                            })
                          }
                          onBlur={() => setTouched({ ...touched, phone: true })}
                        />
                        {touched.phone && !/^\d{10}$/.test(signupData.phone) ? (
                          <span className="text-danger">Phone number must be 10 digits.</span>
                        ) : null}
                      </div>

                      <div className="themeInput">
                        <label>
                          Password <small className="text-danger">*</small>
                        </label>

                        <div className="input-group">
                          <input
                            type={showPass ? 'text' : 'password'}
                            minLength={6}
                            value={signupData.password}
                            onChange={(e) =>
                              setSignupData({ ...signupData, password: e.target.value })
                            }
                            onBlur={() => setTouched({ ...touched, password: true })}
                            className="form-control"
                          />

                          <span
                            className="input-group-text"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>

                        {touched.password && signupData.password.length < 6 ? (
                          <span className="text-danger">
                            Password must be at least 6 characters long.
                          </span>
                        ) : null}
                      </div>

                      <div className="themeInput">
                        <label>
                          Confirm Password <small className="text-danger">*</small>
                        </label>

                        <div className="input-group">
                          <input
                            type={showConfirmPass ? 'text' : 'password'}
                            minLength={6}
                            value={signupData.confirmPassword}
                            onChange={(e) =>
                              setSignupData({ ...signupData, confirmPassword: e.target.value })
                            }
                            onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                            className="form-control"
                          />

                          <span
                            className="input-group-text"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                          >
                            {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>

                        {touched.confirmPassword &&
                        signupData.confirmPassword !== signupData.password ? (
                          <span className="text-danger">Passwords do not match.</span>
                        ) : null}
                      </div>

                      <div className="formBtn">
                        <button type="submit">Signup</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
