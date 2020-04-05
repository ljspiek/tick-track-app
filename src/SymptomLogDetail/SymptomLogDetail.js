import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SymptomsContext from '../SymptomsContext'
import config from '../config'

export default class SymptomLogDetail extends Component {

    state = {
        log: []
    }

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        },
        onDeleteLog: () => {},
    }
    
    static contextType = SymptomsContext

    handleClickDelete = e => {
        e.preventDefault()
        const logId = this.props.match.params.logId
        console.log(logId) 
        fetch(`${config.API_ENDPOINT}/log/${logId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`,
              'Access-Control-Allow-Origin': 'no-cors'
            }
          })
          .then(res => {
            
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
          })
          .then((res) => {
              this.context.deleteLog(logId)
              this.props.onDeleteLog(logId)
              this.props.history.push('/summary')
            console.log(res)
          })
          .catch(error => {
              console.error({ error })
          })
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
                log: res
            })
        })
    }

    render() {
        const logId = this.props.match.params.logId
        const log = this.state.log
       
        
        if(log.length !==0) {
            return (
                <div>
                    <h2>On {log.header[0].date} you reported:</h2>
                    
                        <section>
                            <h4>Overall Health: {log.generalhealth[0].rating}</h4>
                            {log.newinfectionindicators.length > 0 && 
                                <h4>New Infection Indicators:</h4>
                            }
                            {log.newinfectionindicators.map(indicators =>
                                <ul key={`${indicators.log_id}${indicators.infection_id}`}>
                                    <li>{indicators.indicator}</li>
                                </ul>
                            )}
                            <h4>Symptoms:</h4>
                            {log.symptoms.map(symptoms =>
                                <ul key={`${symptoms.log_id}${symptoms.symptom_id}`}>
                                    <li>{symptoms.symptom}: {symptoms.severity}</li>
                                </ul>
                                )}
                            <Link to='/summary'><button>Close</button></Link>
                            {/* TO DO:Make Close into 'x' at top */}
                            <Link to={{pathname:`/log/${logId}/edit`}}><button>Edit</button></Link>
                            {/* TO DO: Pencil icon - mobile only? */}
                            <button onClick={this.handleClickDelete}>Delete</button>
                        </section>
                        
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }

}
