import React from 'react';
import './Content.css';
function Content({children}) {
  return (
    <div className="content">
      {children}
    </div>
  )
}

export default Content