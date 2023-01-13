import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from "../../../assets/images/userphoto.jpg";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileData from './ProfileData';
import EditProfileData from './EditProfileData';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ProfileType } from '../../../models/profile.model';

type PropsType = {
  profile: ProfileType;
  status: string;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  uploadPhoto: (file: File) => void;
  uploadProfileData: (formData: ProfileType) => void; 
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  if(!props.profile.userId){
    return <Redirect to="/error/noprofile" />
  }

  let selectedFile: File | null = null;

  const onFileSelected = (event: any) => {
    if (event.target?.files?.length) {
      selectedFile = event.target.files[0];
    }
  }

  const onUploadPhoto = () => {
    if (selectedFile) {
      props.uploadPhoto(selectedFile);
    }
  }
  const toggleEditMode = (mode: boolean) => {
    setEditMode(mode);
  }

  const onSubmit = (formData: ProfileType) => {
    props.uploadProfileData(formData);
    toggleEditMode(false);
  }

  return (
    <div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
      <div className={classes.description_block}>
        <div>
          <img alt="Avatar" src={props.profile.photos?.large || userPhoto} />
          <div className={classes.download_block}>
            {props.isOwner && <div>
              <input type="file" onChange={onFileSelected} />
              <button onClick={onUploadPhoto}>Upload Photo</button>
            </div>
            }
          </div>
        </div>
        <div>
          {editMode ?
            <EditProfileData initialValues={props.profile} onSubmit={onSubmit} /> :
            <ProfileData profile={props.profile} switchToEditMode={toggleEditMode} isOwner={props.isOwner} />}
        </div>
      </div>


    </div>
  )
}
export default ProfileInfo;