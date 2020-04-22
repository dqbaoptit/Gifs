import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';


import GIF from './containers/GIF/App';
import Sticker from './containers/Sticker';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router >
    <Switch>
      <Route exact path='/Gifs/' component={GIF} />
      <Route path='/Sticker/' component={Sticker} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

