import React from 'react'
import { UserAppContent, UserAppHeader, UserAppFooter } from '../components/User/UserIndex'
import { useLocation } from 'react-router-dom'

const UserLayout = () => {
  const location = useLocation()
  const hideHeaderFooterRoutes = ['/login', '/signup']
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname)

  return (
    <div className="user-site-root d-flex flex-column min-vh-100">
      {/* Header */}
      {!shouldHideHeaderFooter && <UserAppHeader />}

      {/* Main Content */}
      <main className="user-site-main flex-grow-1 px-0 userMainLayoutDiv">
        <UserAppContent />
      </main>

      {/* Footer */}
      {!shouldHideHeaderFooter && <UserAppFooter />}
    </div>
  )
}

export default UserLayout
