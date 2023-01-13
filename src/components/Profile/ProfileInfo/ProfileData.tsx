import { ProfileType } from '../../../models/profile.model';
import classes from './ProfileInfo.module.css';
import SocialItem from './SocialItem';

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  switchToEditMode: (mode: boolean) => void;
}
const ProfileData: React.FC<PropsType> = ({ profile, switchToEditMode, isOwner }) => {

  const onSwitchToEditMode = () => {
    switchToEditMode(true);
  }

  return (
    <div>
     
      <div className={classes.main_name}>Name: {profile.fullName}</div>
      <div>About me: {profile.aboutMe}</div>
      <div>Search a Job: {profile.lookingForAJob ? <span>yes</span> : <span>no</span>}</div>
      {profile.lookingForAJob && profile.lookingForAJobDescription &&
        <div>Searching Job Description:
          <span> {profile.lookingForAJobDescription}</span>
        </div>
      }
      <div>Contacts: </div>
      <div className={classes.social_container}>
        {profile?.contacts && Object.keys(profile.contacts).map(key => {
          let value = profile?.contacts && profile.contacts[key];
          return value ? <SocialItem social={value} title={key} key={key} /> : null;
        })}
      </div>
      {isOwner && <div className={classes.save_button}> <button onClick={onSwitchToEditMode}>Edit Data...</button></div>}
    </div>
  )
}
export default ProfileData;