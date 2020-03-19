import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

export default function Nav() {
    return (
        <nav>
         <ul>
           <li><Link to='/signup'>Sign Up</Link></li>
           <li><Link to='/signin'>Sign In</Link></li>
         </ul>
          
          
          
        </nav>
    )
}
