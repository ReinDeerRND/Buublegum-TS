import { connect } from 'react-redux';
import { sendMessageCreator } from '../../redux/reducers/messageReducer';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuhRedirect';

let mapStateToProps = (state) => {
  return {
    dialogs: state.messagePage.dialogs,
    messages: state.messagePage.messages
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessage) => dispatch(sendMessageCreator(newMessage))
  }
}
const DialogsContainer = compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
export default DialogsContainer;