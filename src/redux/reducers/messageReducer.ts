import { DialogType, MessageType } from "../../models/message.model";
import { MessageActionType, SendMessageCreatorType, SEND_MESSAGE } from "../models/message.model";

export type MessageStateType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
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

const messageReducer = (state = initState, action: MessageActionType): MessageStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            console.log(action);

            let message = {
                id: state.messages.length,
                userId: 0,
                text: action.newMessage,
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

export const sendMessageCreator = (newMessage: string): SendMessageCreatorType => ({ type: SEND_MESSAGE, newMessage });

export default messageReducer;