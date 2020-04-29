import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import SymptomsContext from '../SymptomsContext'
import './nav.css'


export default class Nav extends Component {
  static contextType = SymptomsContext

   state = {
    loggedIn: this.context.loggedIn
  }

  
  

  handleSignOutClick = () => {
    TokenService.clearAuthToken()
    this.context.updateLogin()
    this.setState({
      loggedIn: false
    })
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

  componentDidMount() {
    this.setState({
      loggedIn: this.context.loggedIn
    })
  }
  
  
  render() {

    const loggedIn = this.context.loggedIn

    if(loggedIn === true) {
      return (
          <nav>
           {this.renderSignOutLink()}
          </nav>
      )

    } 
    if(loggedIn === false) {
      return(
        <nav>
        {this.renderSignInLink()}
       </nav>
      )
    }

  }
}
