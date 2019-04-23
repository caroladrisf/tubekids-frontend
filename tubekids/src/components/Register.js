import React, { Component } from 'react';
import { register, sendEmail } from '../services/UserFunctions';

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
      errors: {},
      message: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
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
      } else {
        sendEmail(res.user.id).then(res => {
          if (res.exception) {
            console.log(res.exception)
          } else {
            this.setState({
              message: 'Register completed successfully! Tubekids will send you an email, check it to confirm your email address'
            });
          }
        })
      }
    });
  }

  closeAlert() {
    this.setState({
      message: ''
    });
  }

  message() {
    if (this.state.message) {
      return (
        <div className="alert alert-success">
          <p><i className="fas fa-check"></i> {this.state.message}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 mx-auto text-left">
          <form onSubmit={this.handleSubmit}>
            <h1 className="text-center">User Registration</h1>
            {this.message()}
            <div className="form-row mt-5">
              <div className="form-group col-md-6">
                <label htmlFor="name">First Name <span className="text-danger">*</span></label>
                <input required type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.name && this.state.errors.name[0]}</small>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastname">Last Name <span className="text-danger">*</span></label>
                <input required type="text" name="lastname" className="form-control" value={this.state.lastname} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.lastname && this.state.errors.lastname[0]}</small>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="country">Country</label>
                <input type="text" name="country" className="form-control" value={this.state.country} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.country && this.state.errors.country[0]}</small>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="phone">Phone Number <span className="text-danger">*</span></label>
                <input required type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.phone && this.state.errors.phone[0]}</small>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="birthdate">Birthdate <span className="text-danger">*</span></label>
                <input required type="date" name="birthdate" className="form-control" value={this.state.birthdate} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.birthdate && this.state.errors.birthdate[0]}</small>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                <input required type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.email && this.state.errors.email[0]}</small>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="password">Password <span className="text-danger">*</span></label>
                <input required type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.password && this.state.errors.password[0]}</small>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="confirm_password">Confirm Password <span className="text-danger">*</span></label>
                <input type="password" name="confirm_password" className="form-control" value={this.state.confirm_password} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.confirm_password && this.state.errors.confirm_password[0]}</small>
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
