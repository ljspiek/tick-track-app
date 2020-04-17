import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log(process.env)

ReactDOM.render(
    <App />, document.getElementById('root')
    );
