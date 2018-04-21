import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Icon, Table, Modal ,Container} from 'semantic-ui-react'

import {loadUsers, deleteUser} from '../api'

import {withRouter} from 'react-router'

class UserTable extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message:''
    }
  }
  
  componentDidMount() {
    
    loadUsers().on('value', snapshot =>{
       
        let usuarios = snapshot.val();
        let tmp = [];
        
        for (let u in usuarios) {
           
            tmp.push({
              id: u,
              name: usuarios[u].name,
              email: usuarios[u].email,
              role:usuarios[u].role,
              created_at: usuarios[u].created_at,
              last_time_logged: usuarios[u].created_at
            });
        }

        this.setState({
          users: tmp,
        });
        
    });

  }
 
  removeUser = (userId) =>{
    deleteUser(userId)
    .then(()=>{
      console.log('USUARIO ELIMINADO EXITOSAMENTE');
      this.setState({
        message:'USUARIO ELIMINADO EXITOSAMENTE',
      })
    })
  }

  render() {
    return (

      <Container textAlign='center'>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Creation Date</Table.HeaderCell>
              <Table.HeaderCell>Last Login Date</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
               {
				        this.state.users.map((user)=>{
    				        return(
                      <Table.Row key={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>{user.created_at}</Table.Cell>
                        <Table.Cell>{user.last_time_logged}</Table.Cell>
                        <Table.Cell collapsing>
                            <Button floated='right' icon labelPosition='right' primary size='small' onClick={() => this.removeUser(user.id)}>
                              <Icon name='user' /> Borrar
                            </Button>
                        </Table.Cell>
                    </Table.Row>
    				        )
				        })
				    }    
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button floated='right' icon labelPosition='left' primary size='small' onClick={()=> {window.location ="/register"}}>
                  <Icon name='user' /> Add User                  
                </Button>              
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        {
          <p>{this.state.message}</p>
        }
      </Container>
    )
  };
};

export default withRouter(UserTable);

