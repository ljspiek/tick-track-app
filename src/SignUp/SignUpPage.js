import React, { Component } from 'react'
import SignUp from './SignUp'

export default class SignUpPage extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handleSignUpSuccess = user => {
        const { history } = this.props
        history.push('/signin')
      
    }

    render() {
        return(
        <section>
            <SignUp
            onRegistrationSuccess={this.handleSignUpSuccess}
            />
            <p className="password-requirements">Accepted passwords are a minimum of eight characters long and include at least:</p>
            <ul className="password-req">
                <li className="password-req">One uppercase character</li>
                <li className="password-req">One lowercase character</li>
                <li className="password-req">One special character</li>
                <li className="password-req">One number</li>
            </ul>
        </section>
        )
    }
}
