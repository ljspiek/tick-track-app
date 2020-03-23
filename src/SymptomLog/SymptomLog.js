import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLog extends Component {
    static contextType = SymptomsContext

    state = {
        logDate: "",
        generalhealth: "",
        newinfectionindicators: [],
        
    }

    handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMultipleSelections = (e) => {
        const selections = this.state.newinfectionindicators
        const newSelections = selections.concat(e.target.value)
        this.setState({
            newinfectionindicators: newSelections
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        console.log(e.target[0])
        console.log(this.uncontrolInput.value)
        let logForm = document.getElementById('log-symptoms')
        let formData = new FormData(logForm)
        console.log(formData)

        //POST api to-do
    }

    render() {
        

        return (
            <>
            <h2>Symptom Log</h2>
            <form id="log-symptoms" onSubmit={(e) => {this.handleSubmit(e)}}>
                <section className="form-section overall-health">
                    <label htmlFor="log-date">Date:</label>
                    <input onChange={(e) => {this.handleInputChange(e)}} value={this.state.logDate} type="date" id="log-date" name="logDate" ref={(a) => this.uncontrolInput = a}/>
                    <label htmlFor="overall-health"><h3>Overall Health</h3></label>
                    <p>Generally, do you feel:</p>
                    {this.context.generalhealth.map(health =>
                        <div key={health.id}>
                            <input type="radio" onChange={(e) => {this.handleInputChange(e)}} name="generalhealth" value={health.rating} className="overall-health-radio"/>
                            <label htmlFor="overall-health">{health.rating}</label>
                        </div>
                    )}
                </section>
                <section className="form-section new-infection">
                    <h3>Since your last symptom log, have there been any of the following:</h3>
                    {this.context.newinfectionindicators.map(indicator =>
                        <div key={indicator.id}>
                            <input type="checkbox" onChange={(e) => {this.handleMultipleSelections(e)}} name="newinfectionindicators" value={indicator.indicator} className={indicator.indicator}/>
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
                        <select onChange={(e) => {this.handleInputChange(e)}} id={symptom.symptom} name={symptom.symptom}>
                            <option value="none">None</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                        <br/>
                        </div>
                        )}
                </section>
               
              
                <button type="submit">
                    Save
                </button>
                <button>Reset</button>
                
            </form>
            </>
        )
    }
}
