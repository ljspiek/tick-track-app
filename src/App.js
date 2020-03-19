import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import NotFound from './NotFound/NotFound'


class App extends Component {

  render() {
    return (
      <div className='App'>
        <Nav/>
        <header>
          <Link to='/'><h1>TickTrack</h1></Link>
          <h2>Take control of your Lyme, one day at a time.</h2>
        </header>
        
      <main >
        <Switch>
          <Route 
            exact path='/'
            component={LandingPage}
          />
          <Route
            exact path='/log'
            component={SymptomLog}
          />
          <Route
            exact path='/summary'
            component={SymptomSummary}
          />
          <Route
            exact path='/log/:logId'
            component={SymptomLog}
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
      </main>
      <footer>
        
      </footer>
      </div>
    );
  }
}

export default App;