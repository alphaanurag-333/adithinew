import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMenu,
} from '@coreui/icons'
import { CgMenuRight } from 'react-icons/cg'
import { AppHeaderDropdown } from './header/index'
import { setSidebarShow } from '../features/sidebarSlice'

const AppHeader = () => {
  const headerRef = useRef()
  const { sidebarShow } = useSelector((state) => state.sidebar)

  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className=" mb-1 p-0  adminHeader" ref={headerRef}>
      <CContainer className="border-bottom " fluid>
        <div onClick={() => dispatch(setSidebarShow(!sidebarShow))} className="sidebarIcon">
          <CgMenuRight icon={cilMenu} />
        </div>
        {/* <CHeaderNav className="d-none d-md-flex customSideSpace">
          <CNavItem>
            <NavLink className="dashboardlinks text-white" to="/admin/dashboard" as={NavLink}>
              Dashboard
            </NavLink>
          </CNavItem>
          <CNavItem>
            <NavLink className="dashboardlinks text-white" to="/admin/settings" as={NavLink}>
              Settings
            </NavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
