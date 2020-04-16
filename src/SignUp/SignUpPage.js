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
        </section>
        )
    }
}
