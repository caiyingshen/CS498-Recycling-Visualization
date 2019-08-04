import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import RecyclingChart from './RecyclingChart';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { years, discardedData, incineratedData, recycledData } from './recyclingData'

ReactDOM.render(<RecyclingChart />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
