import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <section className='NotFoundPage'>
                <h2>404 - Page not found</h2>
                <p>Return to <Link to='/'>TickTrack</Link> home page.</p>
                {/* To do - find opossum drawing or other artwork for page */}
            </section>
        </div>
    )
}
