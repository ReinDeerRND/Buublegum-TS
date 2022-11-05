import { getAuthThunkCreator } from "./authReducer";

const SET_INITIALIZED = "app/SET_INITIALIZED";

let initState = { isInitialized: false };

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
}

export const initSuccess = () => ({ type: SET_INITIALIZED });

export const initApp = () => (dispatch) => {
    let authResultPromise = dispatch(getAuthThunkCreator());
    Promise.all([authResultPromise]).then(() => { //array because could be some promises
        dispatch(initSuccess())
    });
}

export default appReducer;