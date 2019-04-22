import React, { Component } from 'react';
import ProfilesList from './ProfilesList';
import ProfileForm from './ProfileForm';

class Profiles extends Component {
    constructor() {
        super();
        this.state = {
            action: 'list'
        }
        this.setAction = this.setAction.bind(this);
    }

    setAction(action) {
        this.setState({
            action: action
        });
    }

    handleCRUDViews() {
        if (this.state.action === 'list') {
            return <ProfilesList setAction={this.setAction} />
        } else if (this.state.action === 'create') {
            return <ProfileForm setAction={this.setAction} currentAction={this.state.action} />
        } else if (this.state.action === 'update') {
            return <ProfileForm setAction={this.setAction} currentAction={this.state.action} />
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">Profiles</h1>
                    { this.handleCRUDViews() }
                </div>
            </div>
        );
    }
}

export default Profiles;
