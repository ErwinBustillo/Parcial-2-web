
import React, { Component } from 'react'


import { Container, Form } from 'semantic-ui-react'

import {saveUser,SignUp} from '../api';

export class Register extends Component {
 

  constructor(props){
      super(props);
      this.state ={
        name: '',  
        email: '',
        password: '', 
        role: '', 
        message:'',
          
      }
      this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    const { name,email, password,role } = this.state
   

    var d = new Date();
    
    const u = {
        email: this.state.email,
        password: this.state.password
    }

    e.preventDefault();

    SignUp(u)
    .then( (user)=>{
        
        const usuario = {
            id:user.uid,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role:(this.state.role == 'admin')?'admin':'user',
            created_at: d.toLocaleString(),
            last_time_logged: user.metadata.lastSignInTime
        }
        saveUser(usuario)
        .then((userdata)=>{
            this.setState({
                message:'REGISTRO COMPLETADO SATISFACTORIAMENTE',
            })
                  
        })
        .catch( error => {
            console.log(error.message);  
            this.setState({
                message:error.message,
            })       
        } );
    })
    .catch( error => console.log(error.message));

  }
  
  render() {
    
    const options = [
        { key: 'admin', text: 'admin', value: 'admin' },
        { key: 'user', text: 'user', value: 'user' },
    ]

    return (
        <Container textAlign='center'>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group  >
                <Form.Input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange} label='Name' type='text'/>               
            </Form.Group>
            <Form.Group  >
                <Form.Input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} label='Email' type='email'/>               
            </Form.Group>
            <Form.Group >
                 <Form.Input placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange} label='Password' type='password'/>
            </Form.Group>
            {
                this.props.isAuthenticated ?
                <Form.Group inline>
                    <Form.Select fluid label='Role' name='role' value={options.value} options={options} placeholder='Role' onChange={this.handleChange} />
                </Form.Group>
                :
                <span></span>
            }
            <Form.Group>
                <Form.Button content='Register' primary/>
            </Form.Group>
            </Form>
            {
               <p>{this.state.message}</p>
            }
        </Container>
    )
  }
}





export default (Register);
