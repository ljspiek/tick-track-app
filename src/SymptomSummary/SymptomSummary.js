import React, { Component } from 'react'
import STORE from '../STORE'

export default class SymptomSummary extends Component {
    render() {
        return (
            <div>
                <h2>Symptom History</h2>
                {STORE.mockdata.map(data =>
                    <section key={data.id}>
                        <h3>{data.date}</h3>
                        <h4>Overall Health: {data.overall}</h4>
                        <h4>New Infection Indicators: {data.newinfection}</h4>
                        <button>Details</button>
                        <button>Delete</button>
                    </section>
                    )}
            </div>
        )
    }
}
