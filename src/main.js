// load main styles
import '../assets/css/main.css';
import '../assets/js/index';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import serverConfig from '../config';

ReactDOM.render(
    <App uploads={serverConfig.uploads} />,
    document.getElementById('root')
);
