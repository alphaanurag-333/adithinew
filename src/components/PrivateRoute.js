// import { Navigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { useSelector } from 'react-redux'

// const PrivateRoute = ({ children }) => {
//   const { admin } = useAuth()
//   const { isAdminAuthenticated } = useSelector((state) => state.auth)

//   return isAdminAuthenticated ? children : <Navigate to="/admin/login" />
// }

// export default PrivateRoute



import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, moduleName = null }) => {
  const { admin, isAdminAuthenticated, allowedModules } = useSelector((state) => state.auth)

  // Not logged in → redirect
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Super admin → full access
  if (admin?.isSuperAdmin) {
    return children
  }

  // No permission required → allow
  if (!moduleName) {
    return children
  }

  // Check permission
  if (!allowedModules.includes(moduleName)) {
    return <Navigate to="/admin/access-denied" replace />
  }

  return children
}

export default PrivateRoute
