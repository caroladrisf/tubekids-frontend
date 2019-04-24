import React, { Component } from 'react';
import { verifyCode } from '../services/UserFunctions';

class VerifyCode extends Component {
    constructor() {
        super();
        this.state = {
            code: '',
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        verifyCode(this.state.code).then(res => {
            console.log(res)
            if (res.error) {
                this.setState({error: res.error})
            } else if (res.message) {
                const token = localStorage.getItem('loginToken')
                localStorage.removeItem('loginToken');
                localStorage.setItem('userToken', token);
                localStorage.removeItem('userId');
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
        <div className="row">
            <div className="col-8 col-md-6 mx-auto">
                <h1 className="text-center text-primary"><i className="fas fa-child"></i> Tubekids</h1>
                <div className="alert alert-info pt-3">
                <p><i className="fas fa-info"></i>  <strong>We sent you a SMS with a verification code.</strong></p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input type="text" name="code" onChange={this.handleInputChange} className="form-control" placeholder="Enter code" />
                        <small className="text-danger">{this.state.error}</small>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Verify</button>
                </form>
            </div>
        </div>
        );
    }
}

export default VerifyCode;
