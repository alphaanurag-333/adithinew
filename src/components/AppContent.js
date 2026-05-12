import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import PrivateRoute from '../components/PrivateRoute'
import routes from '../routes'
const DelayedSuspense = ({ children, fallback, delay = 300 }) => {
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return showFallback ? fallback : children
}
const AppContent = () => {
  return (
    <Suspense
      fallback={
        <div className="mainLoader">
            <div className="loader segment1">
              <span></span>
              <i></i>
            </div>
            <div className="loader segment2">
              <span></span>
              <i></i>
            </div>
            <div className="loader segment3">
              <span></span>
              <i></i>
            </div>
        </div>
      }
    >
      {/* <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element ? <route.element /> : null} />
        ))}
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes> */}


   <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <PrivateRoute moduleName={route.module}>
                <route.element />
              </PrivateRoute>

            }
          />
        ))}

        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
