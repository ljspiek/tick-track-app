import React, { Component } from 'react'
import STORE from '../STORE'

export default class SymptomLog extends Component {
    render() {
        console.log(STORE)
        return (
            <form id="log-symptoms">
                <label htmlFor="log-date">Date:</label>
                <input type="date" id="log-date" name="log-date"/>
                <div className="form-section overall-health">
                    <label htmlFor="overall-health"><h2>Overall Health</h2></label>
                    <p>Generally, do you feel:</p>
                    {STORE.generalhealth.map(health =>
                        <>
                        <input type="radio" name="overall-health" value={health.value} className="overall-health-radio"/>
                        <label htmlFor="overall-health" key={health.id}>{health.rating}</label>
                        </>
                    )}
                </div>
                <div className="form-section symptoms">
                    <label htmlFor="symptoms"><h2>Symptoms</h2></label>
                    {STORE.symptoms.map(symptom =>
                        <>
                        <label htmlFor={symptom.symptom} key={symptom.id}>{symptom.symptom}</label>
                        <select id={symptom.symptom} name={symptom.symptom}>
                            <option value="none">None</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                        <br/>
                        </>
                        )}
                </div>
                <div className="form-section new-infection">
                    <p>Since your last symptom log, have there been any of the following:</p>
                    {STORE.newinfectionindicators.map(indicator =>
                    <>
                    <input type="checkbox" name="new-infection" key={indicator.id} value={indicator.indicator} class={indicator.indicator}/>
                    <label htmlFor={indicator.indicator}>{indicator.indicator}</label>
                    <br/>
                        </>
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
