import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import './nav.css'


export default class Nav extends Component {
  
  handleSignOutClick = () => {
    TokenService.clearAuthToken()
  }

  renderSignOutLink() {
    return (
      <div>
        <Link
        onClick={this.handleSignOutClick}
        to='/'>
          Sign Out
        </Link>
      </div>
    )
  }

  renderSignInLink() {
    return (
      <div>
        <Link
        to='/signin'>
          Sign In
        </Link>
        <Link
        to='/signup'>
          Sign Up
        </Link>
      </div>
    )
  }


  render() {
    return (
        <nav>
         {TokenService.hasAuthToken()
          ? this.renderSignOutLink()
          : this.renderSignInLink()}
        </nav>
    )
  }
}
