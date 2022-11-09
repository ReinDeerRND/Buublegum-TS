import { AppInitialActionType, InitialActionType, SET_INITIALIZED } from "../models/app.model";
import { getAuthThunkCreator } from "./authReducer";



export type InitialStateType = {
    isInitialized: boolean;
}

let initState: InitialStateType = { isInitialized: false };

const appReducer = (state = initState, action: AppInitialActionType): InitialStateType => {
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