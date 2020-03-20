import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'

export default class SymptomSummary extends Component {
    static contextType = SymptomsContext

    render() {
        return (
            <div>
                <h2>Symptom History</h2>
                {this.context.symptomlog.map(data =>
                    <section key={data.id}>
                        <h3>{data.date}</h3>
                        <h4>Overall Health: {data.generalhealth.rating}</h4>
                        <h4>New Infection Indicators: {data.newinfectionindicators.length}</h4>
                        <button>Details</button>
                        <button>Delete</button>
                    </section>
                    )}
            </div>
        )
    }
}
