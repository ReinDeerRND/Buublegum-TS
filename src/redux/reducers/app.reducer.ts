import { getAuthThunkCreator } from "./authReducer";

const SET_INITIALIZED = "app/SET_INITIALIZED";

export type InitialStateType = {
    isInitialized: boolean;
}

export type InitialActionType = {
    type: typeof SET_INITIALIZED;
}

let initState: InitialStateType = { isInitialized: false };

const appReducer = (state = initState, action: any): InitialStateType => {
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

export const initSuccess = (): InitialActionType => ({ type: SET_INITIALIZED });

export const initApp = () => (dispatch: any) => {
    let authResultPromise = dispatch(getAuthThunkCreator());
    Promise.all([authResultPromise]).then(() => { //array because could be some promises
        dispatch(initSuccess())
    });
}

export default appReducer;