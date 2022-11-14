import { connect } from 'react-redux';
import { messageActions } from '../../redux/reducers/messageReducer';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuhRedirect';
import { AppStateType } from '../../redux/store';
import { DialogType, MessageType } from '../../models/message.model';

type MapStateToPropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
}
type MapDispatchToPropsType = {
  sendMessage: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogs: state.messagePage.dialogs,
    messages: state.messagePage.messages
  }
}
let mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (newMessage: string) => dispatch(messageActions.sendMessageCreator(newMessage))
  }
}

const DialogsContainer = compose(
  withAuthRedirect,
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(Dialogs);
export default DialogsContainer;