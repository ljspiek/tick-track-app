import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import Nav from './Nav/Nav'
import SymptomLog from './SymptomLog/SymptomLog'
import SymptomSummary from './SymptomSummary/SymptomSummary'


class App extends Component {

  render() {
    return (
      <div className='App'>
        <Nav/>
        <header>
          <h1>TickTrack</h1>
          <h2>Take control of your Lyme, one day at a time.</h2>
        </header>
        <LandingPage/>
      <main >
        <SymptomLog/>
        <SymptomSummary/>
      </main>
      <footer>
        footer
      </footer>
      </div>
    );
  }
}

export default App;