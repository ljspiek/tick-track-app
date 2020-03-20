import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import SymptomLogDetail from './SymptomLogDetail/SymptomLogDetail'
import NotFound from './NotFound/NotFound'
import SymptomsContext from './SymptomsContext'
import STORE from './STORE'



class App extends Component {

  state = {
    symptomlog: [STORE.symptomlog],
    newinfectionindicators: [STORE.newinfectionindicators],
    generalhealth: [STORE.generalhealth],
    symptoms: [STORE.symptoms]
  };

  componentDidMount() {
    //to do api call & set state
    console.log(this.state)
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

  render() {

    const contextValue = {
      symptomlog: this.state.symptomlog,
      newinfectionindicators: this.state.newinfectionindicators,
      generalhealth: this.state.generalhealth,
      symptoms: this.state.symptoms,
      deleteLog: this.deleteLog,
      addLog: this.addLog

    }

    return (
      <div className='App'>
        <Nav/>
        <header>
          <Link to='/'><h1>TickTrack</h1></Link>
          <h2>Take control of your Lyme, one day at a time.</h2>
        </header>
        
      <main >
        <SymptomsContext.Provider value={contextValue}>
          <Switch>
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route
              exact path='/log'
              component={SymptomLog}
              // render={(props) => <SymptomLog 
              //   {...props} 
              //   symptoms={STORE.symptoms} 
              //   generalhealth={STORE.generalhealth}
              //   newinfection={STORE.newinfectionindicators}
              //   />}
            />
            <Route
              exact path='/summary'
              component={SymptomSummary}
              // render={(props) => <SymptomSummary 
              //   {...props}
              //   symptomlog={STORE.symptomlog}
              // />}
            />
            <Route
              exact path='/log/:logId'
              component={SymptomLogDetail}
            />
            <Route
              exact path='/signUp'
              component={SignUp}
            />
            <Route
              exact path='/signIn'
              component={SignIn}
            />
            <Route
              component={NotFound}
            />
          </Switch>
        </SymptomsContext.Provider>
      </main>
      <footer>
        
      </footer>
      </div>
    );
  }
}

export default App;