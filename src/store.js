import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

let initialState = {
  employees: [],
  departments: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case 'INIT':
      return {...state, employees: action.employees, departments: action.departments}
    case 'UPDATE_EMPLOYEES':
      return {...state, employees: action.employees}
  }
}
const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)

export default store
