const SEND_MESSAGE = "message/SEND_MESSAGE";

export type MessageStateType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
}

export type DialogType = {
    id: number;
    name: string;
}

export type MessageType = {
    id: number;
    userId: number;
    text: string;
    income: boolean;
}

let initState: MessageStateType = {
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

const messageReducer = (state = initState, action: any): MessageStateType => {
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

export type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE;
    newMessage: string;
}

export const sendMessageCreator = (newMessage: string): SendMessageCreatorType => ({ type: SEND_MESSAGE, newMessage });

export default messageReducer;