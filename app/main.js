// load main styles
import './assets/css/main';
import './assets/js/index';

import App from './components/App';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';

import store from './misc/store';

ReactDOM.render(
    <Provider store={ store }><App /></Provider>,
    document.getElementById('root')
);
