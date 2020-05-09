import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SymptomsContext from '../SymptomsContext'
import config from '../config'
import TokenService from '../services/token-service'

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
        
        fetch(`${config.API_ENDPOINT}/log/${logId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${TokenService.getAuthToken()}`,
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
                    <h2 className="log-header-heading">On {log.header[0].date} you reported:</h2>
                    
                        <section className="symptom-log-detail">
                            <h3 className="heading-summary-detail">Overall Health:  {log.generalhealth[0].rating}</h3>
                            {log.newinfectionindicators.length > 0 && 
                                <h4 className="detail-heading">New Infection Indicators</h4>
                            }
                            {log.newinfectionindicators.map(indicators =>
                                <ul className="inf" key={`Indicators_${indicators.log_id}${indicators.infection_id}`}>
                                    <li className="inf">{indicators.indicator}</li>
                                </ul>
                            )}
                            {!log.symptoms[0].id && 
                                <h4 className="detail-heading">No Symptoms Logged</h4>
                            }

                            {log.symptoms[0].id && 
                                <div>
                                    <h4 className="detail-heading">Symptoms</h4>
                                        {log.symptoms.map(symptoms =>
                                            <ul className="symptoms-detail" key={`Symptoms_${symptoms.log_id}${symptoms.symptoms_id}`}>
                                                <li className="symptoms-detail-each">{symptoms.symptom}: {symptoms.severity}</li>
                                            </ul>
                                            )}
                                </div>
                            }
                        </section>
                            <div className="three-buttons">
                               <Link to={{pathname:`/log/${logId}/edit`}}> <button className="edit">Edit</button></Link>
                                
                                <Link to='/summary'><button className="close">Close</button></Link>
                            
                                <button className="delete" onClick={this.handleClickDelete}>Delete</button>
                            </div>
                        
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }

}
