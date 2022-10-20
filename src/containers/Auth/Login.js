import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isTogglePassword: false,
            errMessage: ''
        }
    }
    handleOnChangeInput = (e) => {
        e.preventDefault();
        const target = e.target;
        this.setState({
            [target.name]: target.value,
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            let errData = error.response.data;
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: errData.message,
                    })
                }
            }
        }
    }
    handleTogglePassword = () => {
        this.setState({
            isTogglePassword: !this.state.isTogglePassword
        })
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group input-login">
                            <label htmlFor="">Username:</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="col-12 form-group input-login">
                            <label htmlFor="">Password:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isTogglePassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangeInput(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                <span
                                    className='toggleEye'
                                    onClick={() => { this.handleTogglePassword() }}
                                >
                                    <i className={this.state.isTogglePassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="">
                            <button className="btn-login"
                                onClick={() => { this.handleLogin() }}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g me-2 google-tag"></i>
                            <i className="fab fa-facebook-f facebook-tag"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
