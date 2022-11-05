import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import messageReducer from "./reducers/messageReducer";
import profileReducer from "./reducers/profileReducer";
import friendsWidgetReducer from "./reducers/friendsWidgetReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./reducers/app.reducer";

let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    friendsWidget: friendsWidgetReducer,
    auth: authReducer,
    form: formReducer
})

// without Redux DevTools
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// with Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;