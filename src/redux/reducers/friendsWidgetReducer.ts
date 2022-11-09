import { FriendType } from "../../models/friends.model";

export type FriendStateType = Array<FriendType>;

let initState: FriendStateType = [
    { id: 2, name: "Yugor" },
    { id: 1, name: 'Sveta' },
    { id: 0, name: 'Andrew' },
    // { id: 4, name: 'Semen' },
];

const friendsWidgetReducer = (state = initState, action: any): FriendStateType => {
    switch (action.type) {
        default:
            return state;
    }
}

export default friendsWidgetReducer;