import React from 'react';
import ReactDOM from 'react-dom';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
