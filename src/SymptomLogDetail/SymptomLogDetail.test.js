import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SymptomLogDetail from './SymptomLogDetail'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Router>
        <SymptomLogDetail />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div)
})