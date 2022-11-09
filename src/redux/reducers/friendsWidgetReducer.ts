import { FriendType } from "../../models/friends.model";
import { AddFriendType, ADD_FRIEND, FriendActionType } from "../models/friends.model";

export type FriendStateType = Array<FriendType>;

let initState: FriendStateType = [
    { id: 2, name: "Yugor" },
    { id: 1, name: 'Sveta' },
    { id: 0, name: 'Andrew' },
    // { id: 4, name: 'Semen' },
];

const friendsWidgetReducer = (state = initState, action: FriendActionType): FriendStateType => {
    switch (action.type) {
        case ADD_FRIEND:
            return [
                ...state,
                action.friend]

        default:
            return state;
    }
}

export const addFriend = (friend: FriendType): AddFriendType => ({ type: ADD_FRIEND, friend })

export default friendsWidgetReducer;