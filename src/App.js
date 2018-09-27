import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SVEditor from './Editor';
import Auth from './containers/Auth'


class App extends Component {
  state = {
    
  }

  render () {
    let redirect = null;
    if (localStorage.getItem('token')) {
      redirect = <Redirect to="/SVB-EDITOR/editor"/>
    }

    return (
      <div>
        {redirect}
          <Switch>
            <Route path="/SVB-EDITOR/editor" component={SVEditor} />
            <Route path="/SVB-EDITOR/" exact component={Auth} />
          </Switch>
      </div>
    );
  }
}

export default App;
