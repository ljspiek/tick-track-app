import React, { Component } from 'react'

export default class SignUp extends Component {
    render() {
        return (
            <section>
            <h3>Sign Up</h3>
            <fieldset>
                <form action noValidate>
                    <label htmlFor="sign-in">Sign Up</label>
                    <input className="sign-in" type="email" placeholder="email"/>
                    <input className="sign-in" type="password" placeholder="password"/>
                    <input className="sign-in" type="password" placeholder="repeat password"/>
                    <button>Sign Up</button>

                </form>
            </fieldset>
        </section>
        )
    }
}
