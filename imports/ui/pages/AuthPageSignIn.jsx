import {
    Meteor
} from 'meteor/meteor';
import React from 'react';
import {
    Link
} from 'react-router';
import {
    Component
} from 'react';
var _ = require('lodash');

import AuthPage from './AuthPage.jsx';

let LOG_TAG = "imports/ui/pages/SignInPage";

export default class SignInPage extends Component {
    constructor() {
        super();
        this.state = _.assign(this.state, {
            errors: {}
        });
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        console.log("this",this);

        const email = this.email.value;
        const password = this.password.value;
        const errors = {};

        console.log(LOG_TAG,"email", email);
        console.log(LOG_TAG,"password", password);

        if (!email) {
            errors.email = "email required";
        }
        if (!password) {
            errors.password = "password required";
        }

        this.setState({
            errors
        });
        if (_.keys(errors).length) {
            return;
        }

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    errors: {
                        none: err.reason
                    },
                });
            } else {
                this.context.router.push('/app/dashboard');
            }
        });
    }

    render() {
        const {
            errors
        } = this.state;
        const errorMessages = _.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';
        const content = (
            <form onSubmit = {this.onSubmit}>
                <div className="card" data-background="color" data-color="blue">
                    <div className="header">
                        <h3 className="title">Login</h3>
                    </div>
                    <div className="content">
                        <div className="form-group">
                            <label>Email address</label>
                            <input name = "email" ref = {(c) => {this.email = c;}} placeholder="Enter email"
                                className = {`form-control input-no-border ${errorClass('email')}`}  type="email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name = "password" ref = {(c) => {this.password = c;}} placeholder="Password"
                            className = {`form-control input-no-border ${errorClass('password')}`} type="password" />
                        </div>
                    </div>
                    <div className="footer text-center">
                        <button type="submit" className="btn btn-fill btn-wd">Let's go</button>
                        <div className="forgot">
                            <Link to = "/join">Need an account? Join Now.</Link>
                        </div>
                    </div>
                </div>
            </form>
        );
        return <AuthPage content = {content}/>;
    }
}

SignInPage.contextTypes = {
    router: React.PropTypes.object,
};