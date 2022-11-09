export type Friend = {
    id: number;
    name: string;
}

export type FriendStateType = Array<Friend>;

let initState: Friend[] = [
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