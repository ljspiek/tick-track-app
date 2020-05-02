import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div>
            <section>
                <h3>Lyme Disease: The Great Imitator</h3>
                <p>In a recent study of 6,000+ Lyme patients, 97% reported persisting symptoms.</p>
                <br/>
                <p>TickTrack is a secure app that only requires your email to get started.  Try out the app using the following credentials to see if this solution is right for you.</p>
                <ul>
                    <li>email: testing@testing.com</li>
                    <br/>
                    <li>password: Password1!</li>
                </ul>
            </section>

            <section>
                <Link to='/log'><h3>Log Your Symptoms</h3></Link>
                <p>By helping you log your symptoms daily, TickTrack can provide you with a better awareness of your health.</p>

            </section>

            <section>
                <Link to='/summary'><h3>Track Your Progress</h3></Link>
                <p>TickTrack gives you access to your daily symptoms so that you and your provider can identify trends and the best course of treatment for you.</p>
            </section>
        </div>
    )
}
