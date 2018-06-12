import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import golos from 'golos-js';
import Root from './containers/Root'
import { history, configureStore } from './store';


// golos.config.set('websocket', 'wss://ws.testnet.golos.io');
// golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

const store = configureStore()

ReactDOM.render(<Root store={store} history={history}/>, document.getElementById('root'));
  
registerServiceWorker();


