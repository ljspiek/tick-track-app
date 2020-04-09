import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
import tick from '../tick.png'

export default function Nav() {
    return (
        <nav>
         <ul>
           <li><Link to='/signup'>Sign Up</Link></li>
           <li><Link to='/signin'>Sign In</Link></li>
           {/* <li><Link to='/'><img className="logo" src={tick} alt="logo" /></Link></li> */}
         </ul>
         
          
          
          
          
        </nav>
    )
}
