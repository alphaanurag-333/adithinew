import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, matchRoutes } from 'react-router-dom'
import userRoutes from '../../userRoutes'

const renderRoutes = (routes) =>
  routes.map((route, idx) => {
    if (route.children) {
      return (
        <Route key={idx} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      )
    }
    return <Route key={idx} path={route.path} element={route.element} />
  })

const flattenRoutes = (routes) =>
  routes.flatMap(route =>
    route.children
      ? [route, ...flattenRoutes(route.children)]
      : [route]
  )

const DelayedSuspense = ({ children, fallback, delay = 600 }) => {
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return showFallback ? fallback : children
}

const UserAppContent = () => {
  const location = useLocation()

  const flatRoutes = flattenRoutes(userRoutes).map(r => ({
    path: r.path,
  }))

  const isValidRoute = matchRoutes(flatRoutes, location)

  if (!isValidRoute && location.pathname !== '/') {
    return <Navigate to="/" replace />
  }

  return (
    <DelayedSuspense
      fallback={
        <div className="mainLoader">
          <div className="loader segment1"><span></span><i></i></div>
          <div className="loader segment2"><span></span><i></i></div>
          <div className="loader segment3"><span></span><i></i></div>
        </div>
      }
    >
      <Routes>
        {renderRoutes(userRoutes)}

        {/* safety fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DelayedSuspense>
  )
}

export default React.memo(UserAppContent)


// import React, { Suspense, useEffect, useState } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { CSpinner } from '@coreui/react'
// import userRoutes from '../../userRoutes'

// // helper function for nested routes
// const renderRoutes = (routes) =>
//   routes.map((route, idx) => {
//     if (route.children) {
//       return (
//         <Route key={idx} path={route.path} element={route.element}>
//           {renderRoutes(route.children)}
//         </Route>
//       )
//     }
//     return <Route key={idx} path={route.path} element={route.element} />
//   })

// const DelayedSuspense = ({ children, fallback, delay = 600 }) => {
//   const [showFallback, setShowFallback] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => setShowFallback(false), delay)
//     return () => clearTimeout(timer)
//   }, [delay])

//   return showFallback ? fallback : children
// }

// const UserAppContent = () => {
//   return (
//     <>
//       <DelayedSuspense
//         fallback={
//           <div className="mainLoader">
//             <div className="loader segment1">
//               <span></span>
//               <i></i>
//             </div>
//             <div className="loader segment2">
//               <span></span>
//               <i></i>
//             </div>
//             <div className="loader segment3">
//               <span></span>
//               <i></i>
//             </div>
//           </div>
//         }
//       >
//         <Routes>
//           {renderRoutes(userRoutes)}
//           <Route path="/" element={<Navigate to="" replace />} />
//         </Routes>
//       </DelayedSuspense>
//     </>
//   )
// }

// export default React.memo(UserAppContent)
