import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import SymptomsContext from '../SymptomsContext'
import './nav.css'


export default class Nav extends Component {
  static contextType = SymptomsContext

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  
  

  handleSignOutClick = () => {
    TokenService.clearAuthToken()
    // this.context.updateLogin()
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
      loggedIn: TokenService.hasAuthToken()
    })
  }


  render() {
    const loggedIn = this.state.loggedIn

    if(loggedIn) {
      console.log("RENDER:", this.state.loggedIn)
      return (
          <nav>
           {this.state.loggedIn
            ? this.renderSignOutLink()
            : this.renderSignInLink()}
          </nav>
      )

    } else {
      return(
        <nav>
        {this.state.loggedIn
         ? this.renderSignOutLink()
         : this.renderSignInLink()}
       </nav>
      )
    }

  }
}
