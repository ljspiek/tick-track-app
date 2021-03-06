import React, { Component } from 'react'
import SymptomsContext from '../SymptomsContext'
import config from '../config'
import TokenService from '../services/token-service'

export default class SymptomLogEdit extends Component {
    static contextType = SymptomsContext

    state = {
        currentlog: [],
        logDate: "",
        generalhealth: "",
        newinfectionindicators: [],
        symptoms: [],
        changedSymp: [],
        newSymp: [],
        removeInf: [],
        newInf: []
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
        const selections = this.state.newInf
        let filteredSelections = []
        let removed = []

        if(e.target.defaultChecked) {
            removed.push({id: e.target.name})
            this.setState({
                removeInf: removed
            })
        }
                
        if(e.target.checked) {
            const newSelections = selections.concat({newinfectionindicators_id: e.target.id})
            filteredSelections = [...new Set(newSelections)]
        } else {
            filteredSelections = selections.filter(cb => cb.newinfectionindicators_id !== e.target.id )
        }
        this.setState({
            newInf: filteredSelections
        })
        
    }

    handleSymptomSelections = (e) => {
        let chgSymps = []
        let newSymps = []
        const symptoms = this.state.symptoms
        const changedSymp = this.state.changedSymp
        const newSymp = this.state.newSymp
        const newSelections = {symptoms_id: e.target.id, severity_id: e.target.value}
        const chgSelections = {id: e.target.name, symptoms_id: e.target.id, severity_id: e.target.value}

        const filteredChg = changedSymp.filter((item) => {
            return (item.symptoms_id === e.target.id) ? false : true ;
        })
        

        const filteredNew = newSymp.filter((item) => {
            return (item.symptoms_id === e.target.id) ? false : true ;
        })
       
        
        if(symptoms.some(symptom => symptom.symptoms_id === Number(e.target.id))) {
            chgSymps = filteredChg.concat(chgSelections)
            this.setState({
                changedSymp:chgSymps
            })    
        } 
        
        else {
            newSymps = filteredNew.concat(newSelections)
            this.setState({
                newSymp: newSymps
            })
           
        }
      
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const logDate = this.state.logDate
        const generalhealth = this.state.generalhealth.id
        const newInf = this.state.newInf
        const removeInf = this.state.removeInf
        const changed = this.state.changedSymp
        const newsymp = this.state.newSymp
        const logId = this.props.match.params.logId
        const chgLog = {

            date_created: logDate,
            general_health_id: generalhealth,
            symptomschg: changed,
            symptomsnew: newsymp,
            newinfectionindicators: newInf,
            deletedinfs: removeInf
        }
       
        fetch(`${config.API_ENDPOINT}/log/${logId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'Access-Control-Allow-Origin': 'no-cors'
            },
            body: JSON.stringify(chgLog),
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(e => Promise.reject(e))
                
        })
        .then(() => {
            this.props.history.push({
                pathname: '/summary'
            })
        })
    }

    componentDidMount() {
        const logId = this.props.match.params.logId
        fetch(`${config.API_ENDPOINT}/log/${logId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${TokenService.getAuthToken()}`,
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

                const symptomIds = Object.fromEntries(
                    this.state.currentlog.symptoms.map(symptom => [
                        symptom.symptoms_id,
                        symptom.id
                    ])
                )
        
                const newInfections = Object.fromEntries(
                    this.state.currentlog.newinfectionindicators.map(infections => [
                        infections.infection_id,
                        infections.id,
                    ])
                );

                
           
            return (
                
                <div>
                   <h2>Symptoms Logged</h2>
                
                    <form id="log-symptoms" onSubmit={(e) => {this.handleSubmit(e)}}>
                    <section className="form-section overall-health">
                        <label className="log-date">Date:</label>
                        <input onChange={(e) => {this.handleInputChange(e)}} type="date" id="log-date" name="logDate" defaultValue={this.state.currentlog.header[0].date}/>
                        <fieldset className="genhealth-fieldset">
                            <legend><h3>Rate your Overall Health</h3></legend>
                                {this.context.generalhealth.map(health =>
                                    <div className="genhealth" key={`Health_${health.id}`}>
                                        <label className="genhealth">
                                            <input type="radio" onChange={(e) => {this.handleInputChange(e)}} id={health.id} name="generalhealth" value={health.id} defaultChecked={(health.id === this.state.currentlog.generalhealth[0].id) ? true : false} className="overall-health-radio"/>
                                            {health.rating}
                                        </label>
                                    </div>
                                
                                )}
                        </fieldset>
                    </section>
                    <fieldset className="form-section new-infection">
                        <h3 className="infection-title">Do you have any new infection indicators?</h3>
                        {this.context.newinfectionindicators.map(indicator =>
                            <div className="infection" key={`Infection_${indicator.id}`}>
                                <label>
                                    <input type="checkbox" onChange={(e) => {this.handleMultipleSelections(e)}} id={indicator.id} value={indicator.indicator} name ={newInfections[indicator.id] || "newinfectionindicators"} className={indicator.indicator} defaultChecked={(newInfections.hasOwnProperty(indicator.id))}/>
                                    {indicator.indicator}
                                </label>
                                <br/>
                            </div>
                        )}
                    </fieldset>
                    <fieldset className="form-section symptoms">
                        <legend className="symptoms"><h3>How do you feel today?</h3></legend>
                        {this.context.symptoms.map(symptom =>
                            <div key={`Symptom_${symptom.id}` } className="form-section-symptoms">
                            <label className="symptom">{symptom.symptom}</label>
                            <select onChange={(e) => {this.handleSymptomSelections(e)}} id={symptom.id} name ={symptomIds[symptom.id] || symptom.id} defaultValue={symptomEntries[symptom.id] || "1"}>
                                <option value="1">None</option>
                                <option value="2">Mild</option>
                                <option value="3">Moderate</option>
                                <option value="4">Severe</option>
                            </select>
                            <br/>
                            </div>
                            )}
                    </fieldset>
                   
                  
                    <div className="buttons">

                        <button type="submit">Update</button>
                        <button className="cancel">Cancel</button>
                    </div>
                    
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
