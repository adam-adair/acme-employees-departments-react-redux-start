import React from 'react';
import Departments from './Departments';
import Stats from './Stats';
import {connect} from 'react-redux'
import {initialize} from './store'

class App extends React.Component{
  componentDidMount(){
    this.props.initialize();
  }

  render(){
    if(this.props.isReady) {
      return (
        <div>
          <h1>Acme Employees And Departments</h1>
          <Stats />
          <Departments/>
        </div>
      );
    } else return (<p>loading</p>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: function () {
      dispatch(initialize());
    }
  };
}
const mapStateToProps = (state) => {
  return state
 }

export default connect(mapStateToProps,mapDispatchToProps)(App)


