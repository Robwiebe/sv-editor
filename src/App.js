import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SVEditor from './Editor';
import Auth from './containers/Auth'


class App extends Component {
  state = {
    
  }

  render () {
    return (
      <div>
          <Switch>
            <Route path="/editor" component={SVEditor} />
            <Route path="/" exact component={Auth} />
          </Switch>
      </div>
    );
  }
}

export default App;
