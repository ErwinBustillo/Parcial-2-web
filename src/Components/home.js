import React, { Component } from 'react';
import Login from './login'
import Register from './register'
import EditableTable from './table'

import {withRouter} from 'react-router'

class Home extends Component {
   
  constructor(props){
    super(props);
    this.state={
       usuario: null,     
    }
  }

  componentWillMount() {
    this.setState({
      usuario : this.props.usuario,
    })
  }

  render() {
    return (
      <section>
     
        {
          !this.props.isAuthenticated ?
            <Login />
          : <EditableTable/>
        }

        {

        }
      </section>
    )
  };
};

export default withRouter(Home);

