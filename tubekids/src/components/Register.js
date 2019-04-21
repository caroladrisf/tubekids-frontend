import React, { Component } from 'react';
import { register } from '../services/UserFunctions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      birthdate: '',
      email: '',
      password: '',
      confirm_password: '',
      country: '',
      phone: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      birthdate: this.state.birthdate,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      country: this.state.country,
      phone: this.state.phone
    }

    register(user).then(res => {
      if (res.errors) {
        this.setState({ errors: res.errors });
        console.log(this.state.errors);
      } else if (res.error) {
        this.setState({ errors: [res.error] });
        console.log(this.state.errors);
      } else {
        console.log(res.user);
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 mx-auto text-left">
          <form onSubmit={this.onSubmit}>
            <h1 className="text-center">User Registration</h1>
            <div className="form-row mt-5">
              <div className="form-group col-md-6">
                <label htmlFor="name">First Name <span className="text-danger">*</span></label>
                <input required type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastname">Last Name <span className="text-danger">*</span></label>
                <input required type="text" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="country">Country code</label>
                <input type="text" name="country" className="form-control" value={this.state.country} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="phone">Phone Number <span className="text-danger">*</span></label>
                <input required type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="birthdate">Birthdate <span className="text-danger">*</span></label>
                <input required type="date" name="birthdate" className="form-control" value={this.state.birthdate} onChange={this.onChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                <input required type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="password">Password <span className="text-danger">*</span></label>
                <input required type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="confirm_password">Confirm Password <span className="text-danger">*</span></label>
                <input type="password" name="confirm_password" className="form-control" value={this.state.confirm_password} onChange={this.onChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-4">
                <input type="submit" className="btn btn-primary btn-block" value="Register"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
