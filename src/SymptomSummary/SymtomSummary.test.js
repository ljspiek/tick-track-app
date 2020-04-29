import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SymptomSummary from './SymptomSummary'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Router>
        <SymptomSummary />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div)
})