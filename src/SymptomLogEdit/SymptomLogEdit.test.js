import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SymptomLogEdit from './SymptomLogEdit'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Router>
        <SymptomLogEdit />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div)
})