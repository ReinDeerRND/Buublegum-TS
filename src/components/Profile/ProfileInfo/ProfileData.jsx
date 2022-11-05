import classes from './ProfileInfo.module.css';
import SocialItem from './SocialItem';

const ProfileData = ({ profile, switchToEditMode, isOwner }) => {

  const onSwitchToEditMode = () => {
    switchToEditMode(true);
  }

  return (
    <div>
      {isOwner && <div className={classes.top_button}> <button onClick={onSwitchToEditMode}>Edit Data...</button></div>}
      <div>Name: {profile.fullName}</div>
      <div>About me: {profile.aboutMe}</div>
      <div>Search a Job: {profile.lookingForAJob ? <span>yes</span> : <span>no</span>}</div>
      {profile.lookingForAJob && profile.lookingForAJobDescription &&
        <div>Searching Job Description:
          <span> {profile.lookingForAJobDescription}</span>
        </div>
      }
      <div>Contacts: </div>
      <div className={classes.social_container}>
        {Object.keys(profile.contacts).map(key => {
          let value = profile.contacts[key];
          return value ? <SocialItem social={value} title={key} key={key} /> : null;
        })}
      </div>
    </div>
  )
}
export default ProfileData;