import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'
import config from '../config'

export default class SymptomLogEdit extends Component {
    static contextType = SymptomsContext

    state = {
        currentlog: [],
        logDate: "",
        generalhealth: "",
        newinfectionindicators: [],
        symptoms: [],
        changedSymp: [],
        newSymp: []
    }

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMultipleSelections = (e) => {
        const selections = this.state.newinfectionindicators
        let filteredSelections = []
        if(e.target.defaultChecked && !e.target.checked) {

        }
        if(e.target.checked) {
            const newSelections = selections.concat({newinfectionindicators_id: e.target.id})
            filteredSelections = [...new Set(newSelections)]
        } else {
            filteredSelections = selections.filter(cb => e.target.value !== cb)
        }
        this.setState({
            newinfectionindicators: filteredSelections
        })
        
    }

    handleSymptomSelections = (e) => {
        let chgSymps = []
        let newSymps = []
        const symptoms = this.state.symptoms
        const changedSymp = this.state.changedSymp
        const newSymp = this.state.newSymp
        const newSelections = {symptoms_id: e.target.id, severity_id: e.target.value}
        const filteredChg = changedSymp.filter((item) => {
            return (item.symptoms_id === Number(e.target.id)) ? true : false ;
        })
        const filteredNew = newSymp.filter((item) => {
            return (item.symptoms_id === Number(e.target.id)) ? true : false ;
        })
        if(symptoms.some(symptom => symptom.symptoms_id === Number(e.target.id))) {
            chgSymps = filteredChg.concat(newSelections)
        } else {
            newSymps = filteredNew.concat(newSelections)
        }
        this.setState({
            changedSymp: chgSymps,
            newSymp: newSymps
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const logDate = this.state.logDate
        const generalhealth = this.state.generalhealth
        const newinfectionindicators = this.state.newinfectionindicators
        const symptoms = this.state.symptoms
        const changed = this.state.changedSymp
        const newsymp = this.state.newSymp
       
        console.log("LOGDATE:", logDate, "GENERALHEALTH_ID:", generalhealth, newinfectionindicators, symptoms)
        console.log("CHANGED:", changed, "NEW:", newsymp)
        

        //POST api to-do
    }

    componentDidMount() {
        const logId = this.props.match.params.logId
        fetch(`${config.API_ENDPOINT}/log/${logId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`,
              'Access-Control-Allow-Origin': 'no-cors'
            }
          })
        .then((res) => {
            if(!res.ok)
                return res.json().then(e => Promise.reject(e));
            return res.json()
        })
        .then((res) => {
            this.setState({
                currentlog: res,
                logDate: res.header[0].date,
                generalhealth: res.generalhealth[0],
                newinfectionindicators: res.newinfectionindicators,
                symptoms: res.symptoms
            })
        })
    }


    render() {

        
        const log = this.state.currentlog
        if (log.length !== 0) {
                const symptomEntries = Object.fromEntries(
                    this.state.currentlog.symptoms.map(symptom => [
                        symptom.symptoms_id,
                        symptom.severity_id
                    ])
                );
        
                const newInfections = Object.fromEntries(
                    this.state.currentlog.newinfectionindicators.map(infections => [
                        infections.infection_id,
                        infections.indicator,
                    ])
                );

                
           
            return (
                
                <div>
                   <h2>Symptoms Logged</h2>
                
                    
    
                    <form id="log-symptoms" onSubmit={(e) => {this.handleSubmit(e)}}>
                    <section className="form-section overall-health">
                        <label htmlFor="log-date">Date:</label>
                        <input onChange={(e) => {this.handleInputChange(e)}} type="date" id="log-date" name="logDate" defaultValue={this.state.currentlog.header[0].date}/>
                        <label htmlFor="overall-health"><h3>Overall Health</h3></label>
                        <p>Generally, do you feel:</p>
                        {this.context.generalhealth.map(health =>
                            <div key={`Health_${health.id}`}>
                                <input type="radio" onChange={(e) => {this.handleInputChange(e)}} id={health.id} name="generalhealth" value={health.id} defaultChecked={(health.id === this.state.currentlog.generalhealth[0].id) ? true : false} className="overall-health-radio"/>
                                <label htmlFor="overall-health">{health.rating}</label>
                            </div>
                        )}
                    </section>
                    <section className="form-section new-infection">
                        <h3>Since your last symptom log, have there been any of the following:</h3>
                        {this.context.newinfectionindicators.map(indicator =>
                            <div key={`Infection_${indicator.id}`}>
                                <input type="checkbox" onChange={(e) => {this.handleMultipleSelections(e)}} id={indicator.id} name="newinfectionindicators" value={indicator.indicator} className={indicator.indicator} defaultChecked={(newInfections.hasOwnProperty(indicator.id))}/>
                                <label htmlFor={indicator.indicator}>{indicator.indicator}</label>
                                <br/>
                            </div>
                        )}
                    </section>
                    <section className="form-section symptoms">
                        <label htmlFor="symptoms"><h3>How do you feel today?</h3></label>
                        {this.context.symptoms.map(symptom =>
                            <div key={`Symptom_${symptom.id}`}>
                            <label htmlFor={symptom.symptom}>{symptom.symptom}</label>
                            <select onChange={(e) => {this.handleSymptomSelections(e)}} id={symptom.id} name={symptom.symptom} defaultValue={symptomEntries[symptom.id] || "1"}>
                                {/* TO DO: resolve default symptom values; changed w/ API connection */}
                                <option value="1">None</option>
                                <option value="2">Mild</option>
                                <option value="3">Moderate</option>
                                <option value="4">Severe</option>
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
        } else {
            return(
                <div>Loading</div>
            )
        }
    }
}
