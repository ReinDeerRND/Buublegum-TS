import { ThunkAction } from "redux-thunk";
import { ActionsType } from "../store";
import { getAuthThunkCreator } from "./authReducer";



export type InitialStateType = {
    isInitialized: boolean;
}

let initState: InitialStateType = { isInitialized: false };

const appReducer = (state = initState, action: AppInitialActionType): InitialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED":
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
}
export const appActions = {
    initSuccess: () => ({ type: "app/SET_INITIALIZED" } as const)
}
type AppInitialActionType = ActionsType<typeof appActions>;

type ThunkType = ThunkAction<void, InitialStateType, unknown, AppInitialActionType>
export const initApp = (): ThunkType => (dispatch: any) => {
    let authResultPromise = dispatch(getAuthThunkCreator());
    Promise.all([authResultPromise]).then(() => { //array because could be some promises
        dispatch(appActions.initSuccess())
    });
}

export default appReducer;