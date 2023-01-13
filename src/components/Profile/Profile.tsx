import { ProfileType } from "../../models/profile.model";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
// import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  profile: ProfileType;
  status: string;
  isLogged: boolean;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  uploadPhoto: (file: File) => void;
  uploadProfileData: (formData: ProfileType) => void;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        uploadPhoto={props.uploadPhoto}
        uploadProfileData={props.uploadProfileData}
      />

      <MyPostsContainer />
    </div>
  );
};
export default Profile;
