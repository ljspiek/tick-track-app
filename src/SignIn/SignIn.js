import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'


export default class SignIn extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null }

   
    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({ error: null })
        
        const email = e.target.elements[1].value
        const password = e.target.elements[2].value

        AuthApiService.postLogin({
            email: email,
            password: password
        })
            .then(res => {
                
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <section>
                <form 
                className='SignInForm'
                onSubmit={this.handleSubmitJwtAuth}
                >
                    <fieldset>
                        <legend><h3>Sign In</h3></legend>
                        <label>
                            email:
                            <input className="email" type="email" placeholder="email"/>
                        </label>
                        <label>
                            password:
                            <input className="password" type="password" placeholder="password"/>
                        </label>
                    </fieldset>
                    <button type='submit'>Sign In</button>
                </form>
        </section>
        )
    }
}
