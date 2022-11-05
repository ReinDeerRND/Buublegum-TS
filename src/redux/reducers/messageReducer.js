const SEND_MESSAGE = "message/SEND_MESSAGE";

let initState = {
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
};

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let message = {
                id: state.messages.length,
                userId: 0,
                text: action.newMessage.newMessage,
                income: false
            }
            return {
                ...state,
                messages: [...state.messages, message],
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessage) => ({ type: SEND_MESSAGE, newMessage });

export default messageReducer;