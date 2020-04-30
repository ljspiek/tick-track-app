import React, { Component } from 'react'
import config from '../config'
import SymptomsContext from '../SymptomsContext'
import TokenService from '../services/token-service'

export default class SymptomLog extends Component {
    static contextType = SymptomsContext

    state = {
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
            const newSelections = selections.concat({newinfectionindicators_id: e.target.id})
            filteredSelections = [...new Set(newSelections)]
        } else {
            filteredSelections = selections.filter(cb => cb.newinfectionindicators_id !== e.target.id )
        }
        this.setState({
            newinfectionindicators: filteredSelections
        })
        
    }

    handleSymptomSelections = (e) => {
        const symptoms = this.state.symptoms
        const newSelections = {symptoms_id: e.target.id, severity_id: e.target.value}
        const filtered = symptoms.filter((item) => { 
            return (item.symptoms_id===e.target.id) ? false : true ; 
         } )
        const newSymptoms = filtered.concat(newSelections)
        
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
        
        const log = {
            date_created: logDate,
            general_health_id: generalhealth,
            newinfectionindicators: newinfectionindicators,
            symptoms: symptoms
        }
        fetch(`${config.API_ENDPOINT}/log`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(log)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
                return res.json()
        })
        .then((data) => {
            this.props.history.push({
                pathname: '/summary',
               
            })
        })
        .catch(error => {
            console.error({ error })
        })

        
    }

    componentDidMount() {
       
    }

    render() {
        
        return (
            <>
            <h2>Symptom Log</h2>
            <form id="log-symptoms" onSubmit={(e) => {this.handleSubmit(e)}}>
                <section className="form-section overall-health">
                    <label htmlFor="log-date">Date:</label>
                    <input onChange={(e) => {this.handleInputChange(e)}} value={this.state.logDate} type="date" id="log-date" name="logDate" ref={(a) => this.uncontrolInput = a}/>
                    <label><h3>Overall Health</h3></label>
                    <p>Generally, do you feel:</p>
                    {this.context.generalhealth.map(health =>
                        <div key={health.id}>
                            <label>
                                <input type="radio" onChange={(e) => {this.handleInputChange(e)}} name="generalhealth" value={health.id} className="overall-health-radio"/>
                                {health.rating}
                            </label>
                        </div>
                    )}
                </section>
                <section className="form-section new-infection">
                    <h3>Since your last symptom log, have there been any of the following:</h3>
                    {this.context.newinfectionindicators.map(indicator =>
                        <div key={indicator.id}>
                            <label>
                                <input type="checkbox" onChange={(e) => {this.handleMultipleSelections(e)}} id={indicator.id} name="newinfectionindicators" value={indicator.indicator} className={indicator.indicator}/>
                                {indicator.indicator}
                            </label>
                            <br/>
                        </div>
                    )}
                </section>
                <section className="form-section symptoms">
                    <label htmlFor="symptoms"><h3>How do you feel today?</h3></label>
                    {this.context.symptoms.map(symptom =>
                        <div key={symptom.id}>
                        <label>{symptom.symptom}</label>
                        <select onChange={(e) => {this.handleSymptomSelections(e)}} id={symptom.id} name={symptom.symptom}>
                            <option value="1">None</option>
                            <option value="2">Mild</option>
                            <option value="3">Moderate</option>
                            <option value="4">Severe</option>
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
