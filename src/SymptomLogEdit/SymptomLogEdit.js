import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLogEdit extends Component {
    static contextType = SymptomsContext

    state = {
        symtoms: this.context.symptoms,
        newinfectionindicators: this.context.newinfectionindicators,
        generalhealth: this.context.generalhealth,
        defaults: {
            1: "mild",
            2: "none"
        },
        currentlog: {
            "id": "1",
            "date": "March 14, 2020",
            "generalhealth": {
                "id": 4,
                "rating": "Better"
            },
            "newinfectionindicators": [],
            "symptoms": [
                {
                    "id": 1,
                    "symptom": "Persistent swollen glands",
                    "severity": "none"
                },
                {
                    "id": 2, 
                    "symptom": "Sore throat",
                    "severity": "mild"
                },
                {
                    "id": 3,
                    "symptom": "Fevers",
                    "severity": "none"
                },
                {
                    "id": 4,
                    "symptom": "Sore soles, especially in AM",
                    "severity": "mild"
                },
                {
                    "id": 5,
                    "symptom": "Joint pain",
                    "severity": "mild"
                },
                {
                    "id": 6,
                    "symptom": "Joint swelling",
                    "severity": "mild"
                },
                {
                    "id": 7,
                    "symptom": "Unexplained back pain",
                    "severity": "none"
                },
            ]

        },

    }
    
    componentDidMount() {
        const log = this.context.symptomlog.find(
            log => { return log.id === this.props.match.params.logId }
        )
        const currentEntries = Object.fromEntries(
            this.state.currentlog.symptoms.map(symptom => [
                symptom.id,
                symptom.severity
            ])
        );
        
            this.setState({ 
                currentlog: log,
                defaults: currentEntries
            })
    }
    render() {
        // const currentEntries = Object.fromEntries(
        //     this.state.currentlog.symptoms.map(symptom => [
        //         symptom.id,
        //         symptom.severity
        //     ])
        // );
        // console.log("CURRENT ENTRIES=",currentEntries)

        // console.log("STATE =",this.state)
        // console.log("CURRENT LOG=",this.state.currentlog)
        console.log(this.state.defaults)
        return (
            <div>
               <h2>Symptoms Logged</h2>
                
                <section>
                    <h3>{this.state.currentlog.date}</h3>
                    <h4>Overall Health: {this.state.currentlog.generalhealth.rating}</h4>
                    {/* {newInfection > 0 && 
                    <h4>New Infection Indicators:</h4>
                    } */}
                    {/* {log.newinfectionindicators.map(indicators =>
                        <ul key={indicators.id}>
                            <li>{indicators.indicator}</li>
                        </ul>
                    )} */}
                    <h4>Symptoms Logged:</h4>
                </section>

                <form id="log-symptoms">
                <section className="form-section overall-health">
                    <label htmlFor="log-date" selected={this.state.currentlog.date}>Date:</label>
                    <input type="date" id="log-date" name="log-date"/>
                    <label htmlFor="overall-health"><h3>Overall Health</h3></label>
                    <p>Generally, do you feel:</p>
                    {this.context.generalhealth.map(health =>
                        <div key={health.id}>
                            <input type="radio" name="overall-health" value={health.value} className="overall-health-radio"/>
                            <label htmlFor="overall-health">{health.rating}</label>
                        </div>
                    )}
                </section>
                <section className="form-section new-infection">
                    <h3>Since your last symptom log, have there been any of the following:</h3>
                    {this.context.newinfectionindicators.map(indicator =>
                        <div key={indicator.id}>
                            <input type="checkbox" name="new-infection" value={indicator.indicator} className={indicator.indicator}/>
                            <label htmlFor={indicator.indicator}>{indicator.indicator}</label>
                            <br/>
                        </div>
                    )}
                </section>
                <section className="form-section symptoms">
                    <label htmlFor="symptoms"><h3>How do you feel today?</h3></label>
                    {this.context.symptoms.map(symptom =>
                        <div key={symptom.id}>
                        <label htmlFor={symptom.symptom}>{symptom.symptom}</label>
                        <select id={symptom.symptom} name={symptom.symptom} defaultValue={this.state.defaults[symptom.id] || "none"}>
                            <option value="none">None</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                        <br/>
                        </div>
                        )}
                </section>
               
              
                <button>Save</button>
                <button>Reset</button>
                
            </form>
            </div>
        )
    }
}
