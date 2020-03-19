import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'


class App extends Component {

  render() {
    return (
      <div className='App'>
        <Nav/>
        <header>
          <h1>TickTrack</h1>
          <h2>Take control of your Lyme, one day at a time.</h2>
        </header>
        
      <main >
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
      </main>
      <footer>
        footer
      </footer>
      </div>
    );
  }
}

export default App;