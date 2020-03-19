import React, { Component } from 'react'
import STORE from '../STORE'

export default class SymptomLog extends Component {
    render() {
        console.log(STORE)
        return (
            <form id="log-symptoms">
                <label htmlFor="log-date">Date:</label>
                <input type="date" id="log-date" name="log-date"/>
                <section className="form-section overall-health">
                    <label htmlFor="overall-health"><h3>Overall Health</h3></label>
                    <p>Generally, do you feel:</p>
                    {STORE.generalhealth.map(health =>
                        <div key={health.id}>
                        <input type="radio" name="overall-health" value={health.value} className="overall-health-radio"/>
                        <label htmlFor="overall-health">{health.rating}</label>
                        </div>
                    )}
                </section>
                <section className="form-section symptoms">
                    <label htmlFor="symptoms"><h3>Symptoms</h3></label>
                    {STORE.symptoms.map(symptom =>
                        <div key={symptom.id}>
                        <label htmlFor={symptom.symptom} >{symptom.symptom}</label>
                        <select id={symptom.symptom} name={symptom.symptom}>
                            <option value="none">None</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                        <br/>
                        </div>
                        )}
                </section>
                <div className="form-section new-infection">
                    <h3>Since your last symptom log, have there been any of the following:</h3>
                    {STORE.newinfectionindicators.map(indicator =>
                    <div key={indicator.id}>
                    <input type="checkbox" name="new-infection" value={indicator.indicator} className={indicator.indicator}/>
                    <label htmlFor={indicator.indicator}>{indicator.indicator}</label>
                    <br/>
                        </div>
                        )}
                  
                </div>
                <button>Delete</button>
                <button>Update</button>
                <button>Cancel</button>
                <button>Save</button>
                <button>Reset</button>
                
            </form>
        )
    }
}
