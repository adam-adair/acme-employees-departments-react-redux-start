import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Departments from './Departments';
import Stats from './Stats';
import {Provider} from 'react-redux'
import store from './store'

class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState();

    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }
  async destroyEmployee(employee){
    await axios.delete(`/api/employees/${employee.id}`);
    const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
    //this.setState({ employees });
    store.dispatch({ type: 'UPDATE_EMPLOYEES', employees})
  }
  async removeFromDepartment(employee){
    employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
    const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
    //this.setState({ employees });
    store.dispatch({ type: 'UPDATE_EMPLOYEES', employees})
  }

  async componentDidMount(){
    store.subscribe(()=> this.setState(store.getState()));
    const responses = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments'),
    ]);
    store.dispatch({ type: 'INIT', employees: responses[0].data, departments: responses[1].data})
  }

  render(){
    // const { departments, employees } = this.state;
    const { destroyEmployee, removeFromDepartment } = this;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats
        //employees={ employees }
        />
        <Departments
          // departments={ departments }
          // employees={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment = { removeFromDepartment }
      />
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
