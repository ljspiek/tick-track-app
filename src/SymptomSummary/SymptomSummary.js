import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import SymptomsContext from '../SymptomsContext'
import TokenService from '../services/token-service'

export default class SymptomSummary extends Component {
    static contextType = SymptomsContext

    state = {
        symptomlog: [],
        
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/log`, {
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
                symptomlog: res
            })
        })
        
    }
    

    render() {
        const symptLog = this.state.symptomlog
        
        if(symptLog.length !== 0) {
            return (
                <div>
                    <h2>Symptom History</h2>
                    {symptLog.map(data =>
                        
                        <section className="symptom-summary" key={`DATA_${data.id}`}>
                            <h3>{data.date}</h3>
                            <h4>Overall Health: {data.generalhealth}</h4>
                            <h4>New Infection Indicators: {data.newinfections || 'None'}</h4>
                            <Link to={`/log/${data.id}`}><button>Details</button></Link>
                            
                        </section>
                        )}
                </div>
            )
        } else{
            return(
                <div>
                    <h2>No logs yet</h2>
                    <p><Link className="go-to-log" to={`/log`}>Log</Link> your symptoms to see your symptom history summary here.</p>
                </div>
            )
        }
       
    }
}
