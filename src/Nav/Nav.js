import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import SymptomsContext from '../SymptomsContext'
import './nav.css'
import tick from '../../src/tick.png'


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
      <div className="sign-out-div">
        <Link
        className="sign-out"
        onClick={this.handleSignOutClick}
        to='/'>
          Sign Out
        </Link>
      </div>
    )
  }

  renderSignInLink() {
    return (
      <div className="public-div">
        <Link className="link-nav"
        to='/signin'>
          Sign In
        </Link>
        <Link className="link-nav"
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
           <Link to='/'><h1 className='app-name'>TickTrack<img className="logo" src={tick} alt="logo" /></h1></Link>
          </nav>
      )

    } 
    if(loggedIn === false) {
      return(
        <nav>
        {this.renderSignInLink()}
        <Link to='/'><h1 className='app-name'>TickTrack<img className="logo" src={tick} alt="logo" /></h1></Link>
       </nav>
      )
    }

  }
}
