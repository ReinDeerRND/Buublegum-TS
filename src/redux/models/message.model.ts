export const SEND_MESSAGE = "message/SEND_MESSAGE";

export type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE;
    newMessage: string
}

export type MessageActionType = SendMessageCreatorType;