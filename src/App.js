import './utils/rem'
import './App.less'
import React, { Component } from 'react';
import routes from './config/routes'
import {Route,Switch,Redirect} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {
            routes.map((routeObj)=>{
              return <Route key={routeObj.path} {...routeObj}></Route>
            })
          }
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }
}

export default App;