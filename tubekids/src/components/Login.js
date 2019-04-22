import React, { Component } from 'react';
import { login } from '../services/UserFunctions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    login(credentials).then(res => {
      if (res.error) {
        this.setState({ error: res.error });
      } else if (res.token) {
        localStorage.setItem('userToken', res.token);
        this.props.history.push('/');
      }
    });
  }

  render() {
    const alert = (
      <div className="alert alert-danger mb-3">
        { this.state.error }
      </div>
    );

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mb-4">Login</h1>
          { this.state.error ? alert : '' }
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
              </div>
            </div>
            <input type="submit" className="btn btn-primary btn-block" value="Login"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
