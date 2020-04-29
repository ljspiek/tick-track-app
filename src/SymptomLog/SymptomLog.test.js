import React from 'react'
import ReactDOM from 'react-dom'
import SymptomLog from './SymptomLog'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <SymptomLog />, div);
    ReactDOM.unmountComponentAtNode(div)
})