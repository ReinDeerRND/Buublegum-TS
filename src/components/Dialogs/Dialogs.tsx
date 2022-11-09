import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css'
import Message from './Message/Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { TextareaControl } from '../common/FormControls/FormControls';
import {maxLength, requiredField} from '../../utils/validators';
import React, { ComponentType } from 'react';
import { DialogType, MessageType } from '../../models/message.model';

type PropsType = {
  dialogs: Array <DialogType>;
  messages: Array <MessageType>
  sendMessage: (newMessage: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

  let dialogsList = props.dialogs.map(dialog => (<DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />));
  let messageList = props.messages.map(message => (<Message message={message.text} key={message.id} />));

  let onSubmit = (formData: {newMessage: string}) => {
    props.sendMessage(formData.newMessage);
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.dialogs_list}>
        {dialogsList}
      </div>
      <div className={classes.dialog}>
        {messageList}
        <div className={classes.new_message}>
          <NewMessageFormRedux onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}


const maxLength50 = maxLength(50);
const NewMessageForm: ComponentType<InjectedFormProps<{}, {}, string>>= (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.new_message}>
      <Field 
      component={TextareaControl} 
      name="newMessage" 
      placeholder="Input new message"
      validate={[requiredField, maxLength50]}
      ></Field>
      <button type="submit">Send message</button>
    </form>
  )
}
//TODO: доработать миграцию redux-form 
// https://stackoverflow.com/questions/48379435/redux-form-props-typescript
const NewMessageFormRedux: any = reduxForm({ form: "newMessage" })(NewMessageForm);

export default Dialogs;