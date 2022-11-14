import { FriendType } from "../../models/friends.model";
import { ActionsType } from "../store";

export type FriendStateType = Array<FriendType>;

let initState: FriendStateType = [
    { id: 2, name: "Yugor" },
    { id: 1, name: 'Sveta' },
    { id: 0, name: 'Andrew' },
    // { id: 4, name: 'Semen' },
];

const friendsWidgetReducer = (state = initState, action: FriendActionType): FriendStateType => {
    switch (action.type) {
        case "friends/ADD_FRIEND":
            return [
                ...state,
                action.friend]

        default:
            return state;
    }
}

export const friendActions = {
    addFriend:  (friend: FriendType) => ({ type: "friends/ADD_FRIEND", friend })
}
type FriendActionType = ActionsType <typeof friendActions>;

export default friendsWidgetReducer;