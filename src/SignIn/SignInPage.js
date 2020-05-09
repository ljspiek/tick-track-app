import React, { Component } from 'react'
import SignIn from './SignIn'

export default class SignInPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        }
    }

    handleSignInSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/log'
        history.push(destination)
    }

    render() {
        return (
            <section>
                <SignIn
                onLoginSuccess={this.handleSignInSuccess}
                />
                <p className="sign-in-dummy">TickTrack is a secure app that only requires your email to get started.  Try out the app using the following credentials to see if this solution is right for you.</p>
                <ul>
                    <li className="sign-in-dummy">email: testing@testing.com</li>
                    
                    <li className="sign-in-dummy">password: Password1!</li>
                </ul>
            </section>
        )
    }
}
