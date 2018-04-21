import React, { Component } from 'react'

import { Menu, Segment, Button,Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'; 

import {logOut} from '../api';

export class Header extends Component {

 constructor(props) {
   super(props)
 
   this.state = {
      activeItem: 'home',
   };
 };

 signOut(){
    logOut()
    .then(()=>{
        this.props.logOut()
    })
 }
 
 handleItemClick = (e, { name }) => this.setState({ activeItem: name })
 
  render() {
    const { activeItem } = this.state  
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          {             
              this.props.isAuthenticated ?
              <nav>
                <Button floated='right' icon labelPosition='left' primary size='small' onClick={()=>{ window.location = "/"}}>
                    <Icon name='user' /> Home
                </Button>  
                <br />    
                <br />  
                <br />                        
                <Button floated='right' icon labelPosition='left' primary size='small' onClick={()=>{this.signOut()}}>
                    <Icon name='user' /> Log out
                </Button>
              </nav>
               :<nav>
              <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Item as={Link} to='/login' name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
              <Menu.Item as={Link} to='/register' name='register' active={activeItem === 'register'} onClick={this.handleItemClick} />  
             </nav>            
          }
        </Menu>
      </Segment>
    )
  };
};


export default (Header)

