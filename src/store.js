import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk';
import axios from 'axios'

let initialState = {
  employees: [],
  departments: [],
  isReady: false
}

const INIT = 'INIT'
const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT'
const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE'

const initializeAction = (employees, departments) => ({
  type: INIT,
  employees,
  departments
})

const removeFromDepartmentAction = (id) => ({
  type: REMOVE_DEPARTMENT,
  id
})

const destroyEmployeeAction = (id) => ({
  type: DESTROY_EMPLOYEE,
  id
})

export const initialize = () => {
  return async function (dispatch) {
    const responses = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments'),
    ]);
    dispatch(initializeAction(responses[0].data,responses[1].data))
  }
}

export const removeFromDepartment = (id) => {
  return async function (dispatch) {
    await axios.put(`/api/employees/${id}`, { departmentId: null})
    dispatch(removeFromDepartmentAction(id))
  }
}

export const destroyEmployee = (id) => {
  return async function (dispatch) {
    await axios.delete(`/api/employees/${id}`);
    dispatch(destroyEmployeeAction(id))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case INIT:
      return {...state, employees: action.employees, departments: action.departments, isReady: true}
    case REMOVE_DEPARTMENT:
      return {...state, employees: state.employees.map(emp => emp.id !== action.id ? emp : {...emp, departmentId: null})}
    case DESTROY_EMPLOYEE:
      return {...state, employees: state.employees.filter(emp => emp.id !== action.id)}
  }
}
const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunk),
)

export default store
