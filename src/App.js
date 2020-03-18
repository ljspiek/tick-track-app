import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'


class App extends Component {
  render() {
    return (
      <div className='App'>
        <nav>
          <Link to='/'>Home/Nav</Link>
        </nav>
        <header>
          <h1>TickTrack</h1>
          <h2>Take control of your Lyme, one day at a time.</h2>
        </header>
        <LandingPage/>
      <main >
        {/* content goes here */}
      </main>
      <footer>
        footer
      </footer>
      </div>
    );
  }
}

export default App;