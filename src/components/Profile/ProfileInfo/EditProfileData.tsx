import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../models/profile.model';
import { createControl, InputControl, TextareaControl } from '../../common/FormControls/FormControls';
import classes from './ProfileInfo.module.css';

type EditOwnPropsType ={
  initialValues: ProfileType
}

interface EditFormDataType  {
  fullName: string;
  aboutMe: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: any;
}

const EditProfileData: React.FC<EditOwnPropsType & InjectedFormProps<EditFormDataType, EditOwnPropsType, string>> = ({ handleSubmit, initialValues, error }) => {
  return (
    <form onSubmit={handleSubmit}>
     
      <div className={classes.common_error}>{error}</div>
      {createControl(InputControl, "fullName", "Name", [], { autoFocus: true })}
      {createControl(TextareaControl, "aboutMe", "About Me", [], {})}
      {createControl(InputControl, "lookingForAJob", null, [], { type: "checkbox" }, "Looking for a Job")}
      {createControl(TextareaControl, "lookingForAJobDescription", "Searching Job Description", [], {})}
      <div className={classes.contacts_title}>Contacts: </div>
      <div className={classes.socials}>
        {Object.keys(initialValues.contacts).map(key => createControl(InputControl, "contacts." +  key, key, [], {}))}
      </div>
      <div className={classes.save_button}> <button type="submit">Save</button></div>
    </form>
  )
}

export default reduxForm<EditFormDataType, EditOwnPropsType>({
  form: 'profileData'
})(EditProfileData);