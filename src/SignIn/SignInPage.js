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
            </section>
        )
    }
}
