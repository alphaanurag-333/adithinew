import React from 'react'
import { CFooter } from '@coreui/react'
import { useSelector } from 'react-redux'

const AppFooter = () => {
  const { config } = useSelector((state) => state.appConfig)
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1"> {config?.app_footer_text || '© 2026 Atithi Devo Bhava.'}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Alphawizz Technologies
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
