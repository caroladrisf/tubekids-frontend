import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProfiles, deleteProfile } from '../services/ProfilesCRUDFunctions';

class ProfileList extends Component {
    constructor() {
        super();
        this.state = {
            profiles: []
        }
        this.setActionToCreate = this.setActionToCreate.bind(this);
        this.setActionToUpdate = this.setActionToUpdate.bind(this);
        this.delete = this.delete.bind(this);
    }

    static propTypes = {
        setAction: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.listProfiles()
    }

    setActionToCreate() {
        this.props.setAction('create')
    }

    setActionToUpdate(e) {
        const i = e.target.attributes['index'].value;
        this.props.setAction('update', this.state.profiles[i]);
    }

    listProfiles() {
        getProfiles().then(res => {
            if (res.error) {
                console.log(res)
            } else {
                this.setState({profiles: res})
            }
        });
    }

    delete(e) {
        const id = e.target.attributes['data-id'].value;
        deleteProfile(id).then(res => {
            if (res) {
                this.listProfiles()
            }
        });
    }

    render() {
        const profiles = this.state.profiles.map((profile, index) => 
            <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.username}</td>
                <td>{profile.pin}</td>
                <td>{profile.age}</td>
                <td>
                    <div className="text-right">
                        <button className="btn btn-secondary btn-sm mr-2" title="Edit" index={index} onClick={this.setActionToUpdate}>
                            <i className="fas fa-pen" index={index}></i>
                        </button>
                        <button className="btn btn-danger btn-sm" title="Delete" data-id={profile.id} onClick={this.delete}>
                            <i className="fas fa-trash" data-id={profile.id}></i>
                        </button>
                    </div>
                </td>
            </tr>
        );

        return (
        <div>
            <div className="row mb-2 mt-4">
                <div className="col-auto">
                    <button type="button" className="btn btn-primary" onClick={this.setActionToCreate}>
                        <i className="fas fa-plus"></i> Create profile
                    </button>
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Pin</th>
                        <th scope="col">Age</th>
                        <th scope="col" className="text-right">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles}
                </tbody>
            </table>
        </div>
        );
    }
}

export default ProfileList;
