import React, { useEffect, useRef, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import  SignupImg  from '../../assets/images/signupImg.png';
import { IoIosArrowDown } from 'react-icons/io'
import {

  mainLogo,
  Search,
  cartImg,
  userImg,
  CardImg1,
} from '../../views/user-views/Image'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import MEDIA_URL from '../../media'
import weblogo from '../../assets/images/mianLogo.png'
import API from '../../api'
import { Link } from 'react-router-dom'

const UserAppHeader = () => {
  const { userLogout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const homeActive = pathname === '/' || pathname === '/home'
  const { user, userToken } = useSelector((state) => state.auth)
  const { config } = useSelector((state) => state.appConfig)
  const resolvedLogo = config?.user_logo ? MEDIA_URL + config.user_logo : weblogo
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // console.log(JSON.stringify(user), 'i am user Header')
  // console.log(user?.profileImage, 'i am user image Header')

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Optional: show a success message after logout
        Swal.fire({
          icon: 'success',
          title: 'Logged out',
          text: 'You have been logged out successfully',
          timer: 1500,
          showConfirmButton: false,
        })
        userLogout()
        navigate('/home')
      }
    })
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }
  const [products, setProducts] = useState([])
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    API.get(`/user/misc/products`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => {
      setProducts(res.data.data || [])
    })
  }

  const [searchTerm, setSearchTerm] = useState('')

  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase()

    return (
      product?.name?.toLowerCase().includes(search) ||
      product?.sub_title?.toLowerCase().includes(search) ||
      product?.tags?.some((tag) => tag.toLowerCase().includes(search))
    )
  })

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const gotoprofile = () => {
    navigate('/user-profile')
  }

  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  return (
    <>
      <header className={isScrolled ? 'header-scrolled' : ''}>
        <div className="container">
          <div className="customNavbar">
            <NavLink to="/home">
              <img
                className="mainLogo"
                src={resolvedLogo}
                alt="Logo"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = weblogo
                }}
              />
            </NavLink>

            <div className="profileSide">
           <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">

  <NavLink
    to="/home"
    className={`user-header-link${homeActive ? ' active' : ''}`}
  >
    Home
  </NavLink>

  <NavLink
    to="/page/about-us"
    className={({ isActive }) =>
      `user-header-link${isActive ? ' active' : ''}`
    }
  >
    About
  </NavLink>

  <NavLink
    to="/contact-us"
    className={({ isActive }) =>
      `user-header-link${isActive ? ' active' : ''}`
    }
  >
    Contact
  </NavLink>

<a
  href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank"
  rel="noopener noreferrer"
  className="header-signup header-partner-cta"
  style={{ whiteSpace: 'nowrap' }}
>
  Partner With Us
</a>

</div>

              {user ? (
                <div className="userDropdown">
                  <button onClick={gotoprofile}>
                    <img className='border'
                      src={user?.image ? `${user?.image}` :  SignupImg }
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = userImg
                      }}
                    />
                    {/* <p className="navUserName">
                      {user?.f_name}
                      <IoIosArrowDown />
                    </p> */}
                  </button>

                  {dropdownOpen && (
                    <div
                      className="dropdownMenu"
                      style={{
                        position: 'absolute',
                      }}
                    >
                      <NavLink to="/user-profile" onClick={() => setDropdownOpen(false)}>
                        My Profile
                      </NavLink>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="d-flex gap-2">
                  {/* <div onClick={gotoprofile} className="userDropdown">
                    <button>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHTStpOtiw5tjChM89XtWg8vncvRln_7GBg&s"
                        alt="Profile"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = userImg
                        }}
                      />

                    </button>
                  </div> */}

                  <NavLink to="/login" className="loginBtn">
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="mobileNavbar">
        <div className="customNavbar">
          <NavLink to="/home" className="me-1">
            <img
              className="mainLogo"
              src={resolvedLogo}
              alt="Logo"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = weblogo
              }}
            />
          </NavLink>

          <div className="profileSide">
            <button
              type="button"
              className="mobile-menu-trigger"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              aria-label="Open menu"
            >
            <FiMenu className="menuIcon" />
            </button>
          </div>
        </div>
      </header>
      <div className="bottomHeader mobileBottomBar">
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header d-flex align-items-center justify-content-between gap-2">
            <div className="header-brand d-inline-flex align-items-center">
              <img
                className="mainLogo"
                src={resolvedLogo}
                alt=""
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = mainLogo || weblogo
                }}
              />

            </div>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => navigate('/home')}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => navigate('/page/about-us')}>
                  About
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => navigate('/contact-us')}>
                  Contact
                </button>
              </li>

              {!user ? (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link"
                      data-bs-dismiss="offcanvas"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link"
                      data-bs-dismiss="offcanvas"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </button>
                  </li>
                </>
              ) : (
                <div className="userDropdown">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link"
                      data-bs-dismiss="offcanvas"
                      onClick={() => navigate('/user-profile')}
                    >
                      My Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="nav-link" data-bs-dismiss="offcanvas" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAppHeader
