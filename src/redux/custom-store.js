import messageReducer from "./reducers/messageReducer";
import profileReducer from "./reducers/profileReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 0, text: "Post 1 About ocean", likesCount: 3 },
                { id: 1, text: "Post 2 About Sun", likesCount: 42 }
            ],
            newPostText: ""
        },
        messagePage: {
            dialogs: [
                { id: 0, name: 'Andrew' },
                { id: 1, name: 'Sveta' },
                { id: 2, name: 'Afina' },
                { id: 3, name: 'Guru' },
                { id: 4, name: 'Stranger' },
            ],
            messages: [
                { id: 0, userId: 0, text: "Hi! How are you?", income: true },
                { id: 1, userId: 0, text: "Hi! I am fine!", income: false },
                { id: 2, userId: 1, text: "Hi! How are your cat?", income: true }
            ],
            newMessageBody: "",
        },
        friendsWidget: [
            { id: 2, name: "Yugor" },
            { id: 1, name: 'Sveta' },
            { id: 0, name: 'Andrew' },
        ]
    },
    _callSubscriber() {
        console.log("State changed")
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = messageReducer(this._state.messagePage, action);
        this._callSubscriber(this._state);
    },
}

export default store;
