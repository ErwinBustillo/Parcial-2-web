import React, { Component } from 'react'


import {Link} from 'react-router-dom';

import { Container, Form } from 'semantic-ui-react'

import {logIn,getUserById,saveUser} from '../api';


export class Login extends Component {
 

  constructor(props){
      super(props);
      this.state ={
        email: '',
        password: '',  
        message: ''      
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {

    e.preventDefault();
    
    const { email, password } = this.state  
       
    const datos = {email,password}
    
    const user ={email,password}

    

    logIn(user).then(function(user) {
        // Success 
        console.log(user);
        console.log(user.uid);
        console.log(user.metadata.creationTime);
        console.log(user.metadata.lastSignInTime);

        var d = new Date();

        getUserById(user).once('value')
        .then((snapshot)=>{
            const datos = snapshot.val();
           
            const currentUser = {
                id:user.uid,
                name:datos.name,
                email:datos.email,
                password:datos.password,
                role:datos.role,                
                created_at: d.toLocaleString(),
                last_time_logged: user.metadata.lastSignInTime
            }
            saveUser(currentUser)
            console.log("CURRENT USER ");
            console.log(currentUser);
        
            this.props.autenticar(currentUser); 

        })
        .catch((error) => {
            this.setState({
                message: error.message,
            })
        })
       
    })
   .catch(function(error) {
       console.log(error.message);
       this.setState({
           message: error.message,
       })
   });
  

  }
  
  render() {
   
    return (
        <Container textAlign='center'>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group  >
                    <Form.Input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} label='Email' type='email'/>               
                </Form.Group>
                <Form.Group >
                    <Form.Input placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange} label='Password' type='password'/>
                </Form.Group>
                <Form.Group>
                    <Form.Button content='Login' primary/>
                </Form.Group>
            </Form>
            {
                <p>{this.state.message}</p>
            }
                 
        </Container>
    )
  }
}

export default (Login);
