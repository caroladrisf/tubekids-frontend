import React, { Component } from 'react';
import { getUser } from '../services/UserFunctions';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 0,
        name: '',
        lastname: '',
        birthdate: '',
        email: '',
        email_verified_at: '',
        country: '',
        phone: ''
      },
      message: '',
      error: ''
    }
  }

  componentWillMount() {
    getUser().then(res => {
      if (res) {
        this.setState({
          user: res.user
        });
      }
    });
  }

  render() {
    let badge = null;
    if (this.state.user.email_verified_at) {
      badge = (<span className="badge badge-success">Verified!</span>);
    } else {
      badge = (<span className="badge badge-warning">Not Verified!</span>);
    }
    return (
      <div className="row">
        <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Account details</h1>
            <table className="table table-borderless table-hover mt-5">
                <tbody>
                    <tr>
                        <td className="text-left"><strong>Name:</strong></td>
                        <td className="text-right">{this.state.user.name} {this.state.user.lastname}</td>
                    </tr>
                    <tr>
                        <td className="text-left"><strong>Birthdate:</strong></td>
                        <td className="text-right">{this.state.user.birthdate && new Date(this.state.user.birthdate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td className="text-left"><strong>Email Address:</strong></td>
                        <td className="text-right">{this.state.user.email} {this.state.user.email && badge}</td>
                    </tr>
                    <tr>
                        <td className="text-left"><strong>Country:</strong></td>
                        <td className="text-right">{this.state.user.country}</td>
                    </tr>
                    <tr>
                        <td className="text-left"><strong>Phone Number:</strong></td>
                        <td className="text-right">{this.state.user.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default Account;
