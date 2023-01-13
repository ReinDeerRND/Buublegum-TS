import React from "react";
import Profile from "./Profile";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  updateStatusThunkCreator,
  uploadPhoto,
  uploadProfileData,
} from "../../redux/reducers/profileReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuhRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/store";
import { RouteComponentProps } from "react-router";
import { ProfileType } from "../../models/profile.model";

interface MatchParams {
  userId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  authorizedUserId: number;
  profile: ProfileType;
  status: string;
  isLogged: boolean;
  getProfileThunkCreator: (userId: number) => void;
  getStatusThunkCreator: (userId: number) => void;
  updateStatusThunkCreator: (status: string) => void;
  uploadPhoto: (file: File) => void;
  uploadProfileData: (formData: ProfileType) => void;
}

class ProfileContainer extends React.Component<MatchProps> {
  refreshProfile() {
    let userId = +this.props.match.params.userId;
    if (!userId) {
      userId = +this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfileThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: MatchProps, prevState: {}, snapshot: any) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusThunkCreator}
        uploadPhoto={this.props.uploadPhoto}
        uploadProfileData={this.props.uploadProfileData}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
});

export default compose<React.ComponentType>(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    uploadPhoto,
    uploadProfileData,
  })
)(ProfileContainer);
