import { reduxForm } from 'redux-form';
import { createControl, InputControl, TextareaControl } from '../../common/FormControls/FormControls';
import classes from './ProfileInfo.module.css';

const EditProfileData = ({ handleSubmit, initialValues, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.top_button}> <button type="submit">Save</button></div>
      <div className={classes.common_error}>{error}</div>
      {createControl(InputControl, "fullName", "Name", [], { autoFocus: true })}
      {createControl(TextareaControl, "aboutMe", "About Me", [])}
      {createControl(InputControl, "lookingForAJob", null, [], { type: "checkbox" }, "Looking for a Job")}
      {createControl(TextareaControl, "lookingForAJobDescription", "Searching Job Description", [])}
      <div className={classes.contacts_title}>Contacts: </div>
      <div className={classes.socials}>
        {Object.keys(initialValues.contacts).map(key => createControl(InputControl, "contacts." +  key, key, []))}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'profileData'
})(EditProfileData);