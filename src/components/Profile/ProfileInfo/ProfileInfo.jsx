import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from "../../../assets/images/userphoto.jpg";
import backgroundPhoto from "../../../assets/images/china.jpg";
//import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileData from './ProfileData';
import EditProfileData from './EditProfileData';
import { useState } from 'react';

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }
  let selectedFile = null;

  const onFileSelected = (event) => {
    if (event.target?.files?.length) {
      selectedFile = event.target.files[0];
    }
  }

  const onUploadPhoto = () => {
    if (selectedFile) {
      props.uploadPhoto(selectedFile);
    }
  }
  const toggleEditMode = (mode) => {
    setEditMode(mode);
  }

  const onSubmit =(formData)=>{
    props.uploadProfileData(formData);
    toggleEditMode(false);
  }

  return (
    <div>
      <img className={classes.content_img} src={backgroundPhoto} alt="China" />
      <div className={classes.description_block}>
        <img alt="Avatar" src={props.profile.photos.small || userPhoto} />
        {editMode ?
          <EditProfileData initialValues={props.profile} onSubmit={onSubmit}/> :
          <ProfileData profile={props.profile} switchToEditMode={toggleEditMode} isOwner={props.isOwner}/>}
      </div>
      <div className={classes.download_block}>
        {props.isOwner && <div>
          <input type="file" onChange={onFileSelected} />
          <button onClick={onUploadPhoto}>Upload Photo</button>
        </div>
        }
      </div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner }/>
    </div>
  )
}
export default ProfileInfo;