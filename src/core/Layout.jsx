import React from 'react'
import Menu from './Menu'
import '../styles.css'
function Layout({title="Title",description="Description",children,className}) {
  return (
    <div>
        <Menu/>
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <p className={className}>{children}</p>
    </div>
  )
}

export default Layout