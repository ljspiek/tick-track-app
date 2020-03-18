import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
         
          <Link to='/signup'>Sign Up</Link>
          <Link to='/signin'>Sign In</Link>
          <Link to='/log'>Log</Link>
        </nav>
    )
}
