import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLogDetail extends Component {
    static contextType = SymptomsContext

    render() {
     
        const log = this.context.symptomlog.find(
            log => { return log.id === this.props.match.params.logId }
            )
        
        const newInfection = log.newinfectionindicators.length
        

        
        return (
            <div>
                <h2>On {log.date} you reported:</h2>
                
                    <section>
                        <h4>Overall Health: {log.generalhealth.rating}</h4>
                        {newInfection > 0 && 
                        <h4>New Infection Indicators:</h4>
                        }
                        {log.newinfectionindicators.map(indicators =>
                            <ul key={indicators.id}>
                                <li>{indicators.indicator}</li>
                            </ul>
                        )}
                        <h4>Symptoms:</h4>
                        {log.symptoms.map(symptoms =>
                            <ul key={symptoms.id}>
                                <li>{symptoms.symptom}: {symptoms.severity}</li>
                            </ul>
                            )}
                        <Link to='/summary'><button>Close</button></Link>
                        {/* TO DO:Make Close into 'x' at top */}
                        <Link to={`/log/${log.id}/edit`}><button>Edit</button></Link>
                        {/* TO DO: Pencil icon - mobile only? */}
                        <button>Delete</button>
                    </section>
                    
            </div>
        )
    }

}
