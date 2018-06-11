import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import Header from '../components/Header';
import Home from '../containers/Home';
import Article from '../containers/Article';
import CreateFstArticleVersion from '../containers/CreateFstArticleVersion';

export default ({ store , history }) => (
  <Provider store={ store }>
      <ConnectedRouter history={history}>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={'/articles/createNew'} component={CreateFstArticleVersion}/>
            <Route exact path={'/articles/:articleOriginId/:articleVersionId'} component={Article} />
            <Route render={() => (<div>Miss</div>)} />
          </Switch>
        </div>
      </ConnectedRouter>
  </Provider>
);
