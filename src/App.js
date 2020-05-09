import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import tick from './tick.png'
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'
import SignUpPage from './SignUp/SignUpPage'
import SignInPage from './SignIn/SignInPage'
import SymptomLogDetail from './SymptomLogDetail/SymptomLogDetail'
import NotFound from './NotFound/NotFound'
import SymptomLogEdit from './SymptomLogEdit/SymptomLogEdit'
import SymptomsContext from './SymptomsContext'
import config from './config';
import PrivateRoute from './Utilities/PrivateRoute'
import PublicRoute from './Utilities/PublicRoute'
import TokenService from './services/token-service'
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer/Footer'



class App extends Component {

  state = {
    symptomlog: [],
    newinfectionindicators: [],
    generalhealth: [],
    symptoms: [],
    loggedIn: TokenService.hasAuthToken(),
    
  };

  componentDidMount() {
    this.updateFieldsandLogs()
  }

  updateFieldsandLogs = () => {
         
      if(this.state.loggedIn === true) {Promise.all([
        fetch(`${config.API_ENDPOINT}/fields`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
            'Access-Control-Allow-Origin': 'no-cors',
            'Access-Control-Expose-Headers': 'authorization'
          }
        }),
        fetch(`${config.API_ENDPOINT}/log`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
            'Access-Control-Allow-Origin': 'no-cors',
            'Access-Control-Expose-Headers': 'authorization'
          }
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
  }
 
  
  deleteLog = (logId) => {
    this.setState({
      symptomlog: this.state.symptomlog.filter(symptomlog => symptomlog.id !== logId)
    });
  }

  addLog = (logData) => {
    const logs = this.state.symptomlog
    const newLog = logs.concat(logData)
    
    this.setState({
      symptomlog: newLog
    })
  }

  updateLogIn = () => {
    if(TokenService.hasAuthToken()){
      this.setState({
        loggedIn: true
      })
      
      setTimeout(this.updateFieldsandLogs, 20)
      
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
      <BrowserRouter>
      <div className='App'>
        <SymptomsContext.Provider value={contextValue}>
          <header>
            <Nav/>
            <Link to='/'><h1 className='app-name'>TickTrack<img className="logo" src={tick} alt="logo" /></h1></Link>
            
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
        <Footer/>
      </footer>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;