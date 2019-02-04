import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import './sass/app.scss';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
