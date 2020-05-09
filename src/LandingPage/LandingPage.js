import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div>
            <section className="landing-page">
                <h2>Take control of your Lyme, one day at a time.</h2>
                <h3 className="landing-page-tagline">Lyme Disease: The Great Imitator</h3>
                <p className="landing-page-text">In a recent study of 6,000+ Lyme patients, 97% reported persisting symptoms.</p>
                <br/>
                
            </section>

            <section className="landing-page">
                <Link to='/log'><h3 className="landing-page-heading">Log Your Symptoms</h3></Link>
                <p className="landing-page-text">By helping you log your symptoms daily, TickTrack can provide you with a better awareness of your health.</p>

            </section>

            <section className="landing-page">
                <Link to='/summary'><h3 className="landing-page-heading">Track Your Progress</h3></Link>
                <p className="landing-page-text">TickTrack gives you access to your daily symptoms so that you and your provider can identify trends and determine the best course of treatment for you.</p>
            </section>
        </div>
    )
}
