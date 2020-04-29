import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFound from './NotFound'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Router>
        <NotFound />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div)
})