
import { combineReducers} from "redux";
// import { applyMiddleware,  compose  } from "redux";
// import { legacy_createStore as createStore} from 'redux'; // instead below
// import { createStore} from 'redux';
import messageReducer from "./reducers/messageReducer";
import profileReducer from "./reducers/profileReducer";
import friendsWidgetReducer from "./reducers/friendsWidgetReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./reducers/app.reducer";
import { configureStore } from "@reduxjs/toolkit";

let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    friendsWidget: friendsWidgetReducer,
    auth: authReducer,
    form: formReducer
})

type ReducersType  = typeof reducers; //(state: AppStateType)=> AppStateType
export type AppStateType = ReturnType<ReducersType>;

type PropertiesType<T> = T extends {[action: string]: infer U}? U : never;
export type ActionsType<T extends  {[action: string]: (...args: any[])=>any}> = ReturnType <PropertiesType<T>>;

// without Redux DevTools
    //let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// with Redux DevTools
    // JS-version
    //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;
    //const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

const store = configureStore({
    reducer: reducers, 
    middleware: [thunkMiddleware]
});

export default store;