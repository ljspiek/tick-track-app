import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLogDetail extends Component {
    static contextType = SymptomsContext

    render() {
     
        const log = this.context.symptomlog.find(
            log => { return log.id === this.props.match.params.logId }
            )
        
        
        return (
            <div>
                <h2>Symptom Log Detail</h2>
                
                    <section>
                        <h3>{log.date}</h3>
                        <h4>Overall Health: {log.generalhealth.rating}</h4>
                        <h4>New Infection Indicators: {log.newinfectionindicators.length}</h4>
                        <h4>Symptoms Logged:</h4>
                        {log.symptoms.map(symptoms =>
                            <ul key={symptoms.id}>
                                <li>{symptoms.symptom}: {symptoms.severity}</li>
                            </ul>
                            )}
                        <Link to='/summary'><button>Close</button></Link>
                        <button>Delete</button>
                    </section>
                    
            </div>
        )
    }

}
