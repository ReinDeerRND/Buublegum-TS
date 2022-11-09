import { FriendType } from "../../models/friends.model";

export const ADD_FRIEND = "friends/ADD_FRIEND";

export type AddFriendType = {
    type: typeof ADD_FRIEND;
    friend: FriendType
}

export type FriendActionType = AddFriendType;