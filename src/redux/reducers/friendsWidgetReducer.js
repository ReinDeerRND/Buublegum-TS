let initState = [
    { id: 2, name: "Yugor" },
    { id: 1, name: 'Sveta' },
    { id: 0, name: 'Andrew' },
];

const friendsWidgetReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default friendsWidgetReducer;