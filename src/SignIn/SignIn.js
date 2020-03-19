import React, { Component } from 'react'

export default class SignIn extends Component {
    render() {
        return (
            <section>
                <h3>Sign In</h3>
            <fieldset>
                <form action noValidate>
                    <label htmlFor="sign-in">Sign In</label>
                    <input className="sign-in" type="email" placeholder="email"/>
                    <input className="sign-in" type="password" placeholder="password" />
                    <button>Sign In</button>

                </form>
            </fieldset>
            </section>
        )
    }
}
