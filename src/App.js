import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import tick from './tick.png'
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'
import SignUpPage from './SignUp/SignUp'
import SignInPage from './SignIn/SignInPage'
import SymptomLogDetail from './SymptomLogDetail/SymptomLogDetail'
import NotFound from './NotFound/NotFound'
import SymptomLogEdit from './SymptomLogEdit/SymptomLogEdit'
import SymptomsContext from './SymptomsContext'
import config from './config';
import PrivateRoute from './Utilities/PrivateRoute'
import PublicRoute from './Utilities/PublicRoute'
import TokenService from './services/token-service';



class App extends Component {

  state = {
    symptomlog: [],
    newinfectionindicators: [],
    generalhealth: [],
    symptoms: [],
    loggedIn: TokenService.hasAuthToken()
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/fields`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`,
          'Access-Control-Allow-Origin': 'no-cors'
        }
      }),
      fetch(`${config.API_ENDPOINT}/log`, {
          'content-type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`,
          'Access-Control-Allow-Origin': 'no-cors'
      })
    ])
    .then(([fieldsRes, logRes]) => {
      if(!fieldsRes.ok)
        return fieldsRes.json().then(e => Promise.reject(e));
      if(!logRes.ok)
        return logRes.json().then(e => Promise.reject(e));
    return Promise.all([fieldsRes.json(), logRes.json()]);
    })
    .then(([fields, log]) => {
      this.setState({
        newinfectionindicators: fields.newinfectionindicators,
        generalhealth: fields.generalhealth,
        symptoms: fields.symptoms,
        symptomlog: log
      })
    })
    
  }

  deleteLog = (logId) => {
    this.setState({
      symptomlog: this.state.symptomlog.filter(symptomlog => symptomlog.id !== logId)
    });
  }

  addLog = (logData) => {
    const logs = this.state.symptomlog
    const newLog = logs.concat(logData)
    console.log(logs, newLog)
    this.setState({
      symptomlog: newLog
    })
  }

  updateLogIn = () => {
    if(TokenService.hasAuthToken()){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  render() {

    

    const contextValue = {
      symptomlog: this.state.symptomlog,
      newinfectionindicators: this.state.newinfectionindicators,
      generalhealth: this.state.generalhealth,
      symptoms: this.state.symptoms,
      deleteLog: this.deleteLog,
      addLog: this.addLog,
      currentlog: [],
      loggedIn: this.state.loggedIn,
      updateLogin: this.updateLogIn

    }

    

    return (
      <div className='App'>
        <SymptomsContext.Provider value={contextValue}>
          <header>
            <Nav/>
            <Link to='/'><h1 className='app-name'>TickTrack<img className="logo" src={tick} alt="logo" /></h1></Link>
            <h2>Take control of your Lyme, one day at a time.</h2>
          </header>
        
          <main >
              <Switch>
                <Route 
                  exact path='/'
                  component={LandingPage}
                />
                <PrivateRoute
                  exact path='/log'
                  component={SymptomLog}
                />
                <PrivateRoute
                  exact path='/summary'
                  component={SymptomSummary}
                />
                <PrivateRoute
                  exact path='/log/:logId'
                  component={SymptomLogDetail}
                />
                <PrivateRoute
                  exact path='/log/:logId/edit'
                  component={SymptomLogEdit}
                />
                <PublicRoute
                  exact path='/signUp'
                  component={SignUpPage}
                />
                <PublicRoute
                  exact path='/signIn'
                  component={SignInPage}
                />
                <Route
                  component={NotFound}
                />
              </Switch>
          </main>
        </SymptomsContext.Provider>
      <footer>
        
      </footer>
      </div>
    );
  }
}

export default App;