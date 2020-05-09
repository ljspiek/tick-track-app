import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import SymptomsContext from '../SymptomsContext'


export default class SignIn extends Component {
    static contextType = SymptomsContext

    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { 
        error: null,
        loggedIn: this.context.loggedIn
    }

   
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
                this.context.updateLogin()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <section>
                <div role='alert'>
                    {error && <p className="sign-error">{error}</p>}
                </div>
                <form 
                className='SignInForm'
                onSubmit={this.handleSubmitJwtAuth}
                >
                    <fieldset className="signIn">
                        <legend><h3>Sign In</h3></legend>
                        <label className="sign">
                            email:
                            <input className="email" type="email" placeholder="email" required/>
                        </label>
                        <br/>
                        <br/>
                        <label className="sign">
                            password:
                            <input className="password" type="password" placeholder="password" required/>
                        </label>
                    </fieldset>
                    <button type='submit' className='sign'>Sign In</button>
                </form>
        </section>
        )
    }
}
