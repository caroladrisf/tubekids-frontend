import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createProfile } from '../services/ProfilesCRUDFunctions';

class ProfileForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            username: "",
            pin: "",
            age: "",
            id: 0,
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setActionToList = this.setActionToList.bind(this);
    }

    static propTypes = {
        setAction: PropTypes.func.isRequired,
        currentAction: PropTypes.oneOf(['create', 'update']).isRequired,
        profile: PropTypes.object
    }

    setActionToList() {
        this.props.setAction('list')
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.currentAction === 'create') {
            this.create();
        }
    }

    create() {
        const profile = {
            name: this.state.name,
            username: this.state.username,
            pin: this.state.pin,
            age: this.state.age
        }

        createProfile(profile).then(res => {
            if (res.errors) {
                this.setState({errors: res.errors});
            } else {
                this.setActionToList();
            }
        });
    }

    render() {
        return (
        <form className="w-75 mx-auto mt-4" onSubmit={this.handleSubmit}>
            <div className="form-row">
                <div className="form-group col-12">
                    <legend>{this.props.currentAction === 'create' ? 'Create' : 'Update'} profile</legend>
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <input required type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
                    <small className="text-danger">{this.state.errors.name && this.state.errors.name[0]}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <label htmlFor="username">Username <span className="text-danger">*</span></label>
                    <input required type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleInputChange} />
                    <small className="text-danger">{this.state.errors.username && this.state.errors.username[0]}</small>
                </div>
                <div className="form-group col-sm-6">
                    <label htmlFor="pin">Pin <span className="text-danger">*</span></label>
                    <input required type="number" name="pin" className="form-control" value={this.state.pin} onChange={this.handleInputChange} />
                    <small className="text-danger">{this.state.errors.pin && this.state.errors.pin[0]}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <label htmlFor="age">Age</label>
                    <input type="number" min="0" name="age" className="form-control" value={this.state.age} onChange={this.handleInputChange} />
                    <small className="text-danger">{this.state.errors.age && this.state.errors.age[0]}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="col-12 text-right">
                    <button type="submit" className="btn btn-primary mr-2"><i className="fas fa-times"></i> Save</button>
                    <button type="button" className="btn btn-secondary" onClick={this.setActionToList}><i className="fas fa-times"></i> Cancel</button>
                </div>
            </div>
        </form>
        );
    }
}

export default ProfileForm;
