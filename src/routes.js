import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/search';
import PhotoPage from './components/photoPage';

const Routes = (props) => {
    return (
      <Layout>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/search/' component={Search}/>
            <Route exact path='/search/:query' component={Search}/>
            <Route exact path='/photo/' component={PhotoPage}/>
            <Route exact path='/photo/:id' component={PhotoPage}/>
        </Switch>
      </Layout>
    )
}

export default Routes;
