import React, { ChangeEvent } from "react";
import classes from './ProfileStatus.module.css';

type PropsType={
    status: string;
    updateStatus: (status: string) => void;
}

type StateType = {
    editMode: boolean;
    status: string;
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status || "no status yet"
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }

    onStatusChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            status: event.target.value
        });

    };
    render() {
        return (
            <div className={classes.status_container}>
                <div className={classes.title}>Status: </div>
                {
                    !this.state.editMode &&
                    <div><span onDoubleClick={this.activateEditMode.bind(this)}>{this.state.status}</span></div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input autoFocus onBlur={this.deactivateEditMode.bind(this)} value={this.state.status} onChange={this.onStatusChange.bind(this)} />
                    </div>
                }
            </div>
        )
    }
}
//FOR TESTS
export default ProfileStatus;