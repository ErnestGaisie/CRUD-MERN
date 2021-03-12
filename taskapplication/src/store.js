import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeLoginReducer,
  employeeListReducer,
  employeeUpdateReducer,
  employeeDeleteReducer,
  employeeDetailsReducer,
  employeeCreateReducer,
} from "./reducers/employeeReducers";

const reducer = combineReducers({
  employeeLogin: employeeLoginReducer,
  employeeList: employeeListReducer,
  employeeUpdate: employeeUpdateReducer,
  employeeDelete: employeeDeleteReducer,
  employeeDetails: employeeDetailsReducer,
  employeeCreate: employeeCreateReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
