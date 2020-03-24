import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'

export default class SymptomLogEdit extends Component {
    static contextType = SymptomsContext

    state = {
        currentlog: this.context.symptomlog.find(
            log => { return log.id === this.props.match.params.logId }
            ),
        logDate: "",
        generalhealth: "",
        newinfectionindicators: [],
        symptoms: []
    }
    
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMultipleSelections = (e) => {
        const selections = this.state.newinfectionindicators
        let filteredSelections = []
        if(e.target.checked) {
            const newSelections = selections.concat({id: e.target.id, indicator: e.target.value})
            filteredSelections = [...new Set(newSelections)]
        } else {
            filteredSelections = selections.filter(cb => e.target.value !== cb)
        }
        this.setState({
            newinfectionindicators: filteredSelections
        })
        
    }

    handleSymptomSelections = (e) => {
        const symptoms = this.state.symptoms
        const newSelections = {id: e.target.id, severity: e.target.value, symptom: e.target.name}
        const newSymptoms = symptoms.concat(newSelections)
        this.setState({
            symptoms: newSymptoms
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const logDate = this.state.logDate
        const generalhealth = this.state.generalhealth
        const newinfectionindicators = this.state.newinfectionindicators
        const symptoms = this.state.symptoms
        console.log(logDate, generalhealth, newinfectionindicators, symptoms)
        

        //POST api to-do
    }

    componentDidMount() {
        
    }


    render() {

        const symptomEntries = Object.fromEntries(
            this.state.currentlog.symptoms.map(symptom => [
                symptom.id,
                symptom.severity
            ])
        );

        const newInfections = Object.fromEntries(
            this.state.currentlog.newinfectionindicators.map(infections => [
                infections.id,
                infections.indicator,
            ])
        );
        
        return (
            
            <div>
               <h2>Symptoms Logged</h2>
            
                

                <form id="log-symptoms" onSubmit={(e) => {this.handleSubmit(e)}}>
                <section className="form-section overall-health">
                    <label htmlFor="log-date">Date:</label>
                    <input onChange={(e) => {this.handleInputChange(e)}} type="date" id="log-date" name="logDate" defaultValue={this.state.currentlog.date}/>
                    <label htmlFor="overall-health"><h3>Overall Health</h3></label>
                    <p>Generally, do you feel:</p>
                    {this.context.generalhealth.map(health =>
                        <div key={health.id}>
                            <input type="radio" onChange={(e) => {this.handleInputChange(e)}} name="generalhealth" value={health.rating} defaultChecked={(health.id === this.state.currentlog.generalhealth.id) ? true : false} className="overall-health-radio"/>
                            <label htmlFor="overall-health">{health.rating}</label>
                        </div>
                    )}
                </section>
                <section className="form-section new-infection">
                    <h3>Since your last symptom log, have there been any of the following:</h3>
                    {this.context.newinfectionindicators.map(indicator =>
                        <div key={indicator.id}>
                            <input type="checkbox" onChange={(e) => {this.handleMultipleSelections(e)}} name="newinfectionindicators" value={indicator.indicator} className={indicator.indicator} defaultChecked={(newInfections.hasOwnProperty(indicator.id))}/>
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
                        <select onChange={(e) => {this.handleSymptomSelections(e)}} id={symptom.id} name={symptom.symptom} defaultValue={symptomEntries[symptom.id] || "none"}>
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
