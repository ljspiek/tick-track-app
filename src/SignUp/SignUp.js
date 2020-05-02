import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'

export default class SignUp extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = e => {
        e.preventDefault()
        const email = e.target.elements[1].value
        const password = e.target.elements[2].value

        this.setState({ error: null })
        AuthApiService.postUser({
            email: email,
            password: password
        })
        .then(() => {
            
            this.props.onRegistrationSuccess()
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
                className='SignUpForm'
                onSubmit={this.handleSubmit}
                >
                    <fieldset>
                        <legend><h3>Sign Up</h3></legend>
                        <label>
                            email:
                            <input className="email" type="email" placeholder="email" required/>
                        </label>
                        <br/>
                        <br/>
                        <label>
                            password:
                            <input className="password" type="password" placeholder="password" required/>
                        </label>
                    </fieldset>
                    <button className='sign' type='submit'>Sign Up</button>
                </form>
        </section>
        )
    }
}
