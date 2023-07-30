import React from 'react'
import {Link} from 'react-router-dom'

const Title = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary m-2 mt-0">
        <div className="container-left p-2 pt-1 pb-1">
          <span className="navbar-brand mb-0 h1">
            <Link to='/view'
              className='btn btn-default border bg-light rounded-0'>
              View
            </Link>
          </span>
          <span className="navbar-brand mb-0 h1">
            <Link to='/providers'
              className='btn btn-default border bg-light rounded-0'>
              Providers
            </Link>
          </span>
          <span className="navbar-brand mb-0 h1">
            <Link to=''
              className='btn btn-default border bg-light rounded-0'>
              Salir
            </Link> 
          </span>
        </div>
        
      </nav>
    </>
  )
}

export default Title