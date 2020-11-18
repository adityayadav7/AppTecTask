import React, { Component } from 'react'
import './App.css';
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { browserHistory } from "react-router";
import FireBase from './FireBase';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users:''
    }
    
  }
  componentDidMount(){
    var user = FireBase.auth().currentUser;
    this.setState({
     users:user
    })
    if(user){
      console.log(user)
    }
    
    
  }

  render() {
    
    
    return (
      <div className="App">
      <Router history={browserHistory}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App

