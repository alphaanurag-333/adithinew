import React, { useState } from 'react'

const SeeMoreText = ({ text, limit = 250 }) => {
  const [expanded, setExpanded] = useState(false)

  if (!text) return null

  const isLong = text.length > limit
  const shortText = text.slice(0, limit)

  return (
    <div className="expandableText">
      <span>{expanded ? text : shortText}</span>

      {isLong && (
        <button className="see-more-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'See less.' : 'See more'}
        </button>
      )}
      {!expanded && isLong && <span className="dots"> ...</span>}
    </div>
  )
}

export default SeeMoreText
