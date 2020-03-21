import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLogEdit extends Component {
    static contextType = SymptomsContext

    state = {
        defaults: {},
        generalhealth:{},
        newInfections:{},
        currentlog: this.props.location.state.currentlog
    }
    
    componentDidMount() {
        
    }


    render() {
        let checked
        if(this.state.currentlog.newinfectionindicators.length > 0) {checked = "checked"}
        console.log(checked)

        const symptomEntries = Object.fromEntries(
            this.state.currentlog.symptoms.map(symptom => [
                symptom.id,
                symptom.severity
            ])
        );

        // const currentGeneralHealth = Object.fromEntries(
        //     this.state.currentlog.generalhealth.map(health => [
        //         health.id,
        //         health.rating
        //     ])
        // );
        const newInfections = Object.fromEntries(
            this.state.currentlog.newinfectionindicators.map(infections => [
                infections.id,
                infections.indicator
            ])
        )
        console.log(newInfections)
        
 
        console.log(this.state.currentlog.generalhealth)

       
        return (
            
            <div>
               <h2>Symptoms Logged</h2>
            
                

                <form id="log-symptoms">
                <section className="form-section overall-health">
                    <label htmlFor="log-date">Date:</label>
                    <input type="date" id="log-date" name="log-date" defaultValue={this.state.currentlog.date}/>
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
                        <select id={symptom.symptom} name={symptom.symptom} defaultValue={symptomEntries[symptom.id] || "none"}>
                            <option value="none">None</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                        <br/>
                        </div>
                        )}
                </section>
               
              
                <button>Update</button>
                <button>Cancel</button>
                
            </form>
            </div>
        )
    }
}
