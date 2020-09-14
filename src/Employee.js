/* eslint-disable react/button-has-type */
import React from 'react';
import {connect} from 'react-redux'
import {removeFromDepartment, destroyEmployee} from './store'

const Employee = ({ employee, destroy, remove })=> {
  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ ()=> destroy(employee.id)}>x</button>
      {
        !!remove && (
          <button onClick={ ()=> remove(employee.id)}>Remove From Department</button>
        )
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: function (id) {
      dispatch(removeFromDepartment(id));
    },
    destroy: function (id) {
      dispatch(destroyEmployee(id))
    }
  };
 }

 export default connect(null, mapDispatchToProps)(Employee)
