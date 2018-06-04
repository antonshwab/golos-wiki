import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../containers/Home';
import Article from '../containers/Article';
import CrNewArticle from './CrNewArticle';

export default ({ store , history }) => (
  <Provider store={ store }>
    <div>
      <ConnectedRouter history={history}>
        <div> 
          <Header/>                         
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={'/articles/createNew'} component={CrNewArticle}/>          
            <Route exact path={'/articles/:articleOriginId/:articleVersionId'} component={Article} />
          </Switch>
        </div>  
      </ConnectedRouter>
    </div>
  </Provider>
);
