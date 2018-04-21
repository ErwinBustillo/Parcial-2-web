import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

import Login from './Components/login'
import Register from './Components/register'
import Home from './Components/home'

import Header from './Components/header'

import {isAuthenticated} from './api'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isAuthenticated:false,
			userData:null
    };

    this.autenticar = this.autenticar.bind(this);
    this.logOut = this.logOut.bind(this);
    
  };
  
  autenticar(usuario){

    this.setState({
      isAuthenticated:true,
      userData: usuario
    })
    console.log('LOGGED USER');
    console.log(this.state.userData.role);
  }

  logOut(){
    this.setState({
      isAuthenticated:false
    })
  }

  componentDidMount(){
    isAuthenticated
    .then((user)=>{
      if(user!=null)
      this.setState({
        isAuthenticated:true,       
      });      
    })  
  }

  render() {
    return (
      <section>
        <Router>
          <div>
            <Header  isAuthenticated={this.state.isAuthenticated} logOut={this.logOut}/>
            <Switch>
                <Route exact path='/'  render ={()=> <Home isAuthenticated = {this.state.isAuthenticated} usuario={this.state.userData}/>}/>
                <Route path ="/login" render = {()=> <Login autenticar = {this.autenticar}/> } />
                <Route path='/register' render ={()=> <Register isAuthenticated = {this.state.isAuthenticated} />}/>
            </Switch>
          </div>
        </Router>
    </section>
    )
  }
};

export default App;

