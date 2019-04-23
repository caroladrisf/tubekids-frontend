import React, { Component } from 'react';
import { confirmEmail } from '../services/UserFunctions';

class ConfirmEmail extends Component {
    constructor() {
        super();
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        
        confirmEmail(params.id).then(res =>{
            if (res) {
                this.setState({ message: res.message })
            } else {
                this.setState({ error: 'User not found' })
            }
        });
    }

    message() {
        if (this.state.message) {
          return (
            <div className="alert alert-success">
              <p><i className="fas fa-check"></i> {this.state.message}</p>
            </div>
          )
        } else if (this.state.error) {
            return (
              <div className="alert alert-danger">
                <p><i className="fas fa-times"></i> {this.state.error}</p>
              </div>
            )
        }
    }

    render() {
        return (
        <div className="row">
            <div className="col-sm-8 mx-auto">
                <h1 className="text-center">Email Confirmation</h1>
                {this.message()}
            </div>
        </div>
        );
    }
}

export default ConfirmEmail;
