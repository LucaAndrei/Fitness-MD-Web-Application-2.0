import React from 'react';
import {
    Link
} from 'react-router';
import {
    Accounts
} from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';


var _ = require('lodash');

let LOG_TAG = "imports/ui/pages/JoinPage";


export default class JoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, {
            errors: {}
        });

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(LOG_TAG,"onSubmit this", this);
        const username = this.username.value;
        const email = trimInput(this.email.value);
        const password = this.password.value;
        const confirm = this.confirm.value;
        const errors = {};
        let self = this;

        if (!email) {
            errors.email = "email required";
        }
        if (!password) {
            errors.password = "password required";
        }
        if (!isValidLength(password)) {
            errors.passwordLength = "Invalid password length";
        }
        if (confirm !== password) {
            errors.confirm = "password confirm";
        }
        if (!username) {
            errors.name = "username required";
        }

        console.log(LOG_TAG,"username", username);
        console.log(LOG_TAG,"email", email);
        console.log(LOG_TAG,"password", password);
        console.log(LOG_TAG,"confirm", confirm);
        this.setState({
            errors
        });
        if (Object.keys(errors).length) {
            return;
        }

        $.get("https://ipinfo.io", function(response) {
            console.log(LOG_TAG,"response",response);
            Accounts.createUser({
                email,
                password,
                profile : {
                    assignedDoctorId: undefined,
                    name : username,
                    country : response.country
                }
            }, (err) => {
                console.log("err",err);
                console.log("this",this);
                console.log("self",self)
                if (err) {
                    console.log("error")
                    //console.log(LOG_TAG,"user",user);
                    Bert.alert( err.reason, 'danger', 'growl-top-right' );
                    self.setState({
                        errors: {
                            none: err.reason
                        },
                    });
                } else {
                    self.context.router.push('/app/dashboard');
                }
            });

        }, "jsonp");
        /*$.get("https://ipinfo.io", function(response) {
            console.log(LOG_TAG,"response",response);





        }, "jsonp");*/


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
                        <h3 className="title">Sign up</h3>
                    </div>
                    <div className="content">
                        <div className="form-group">
                            <label>Name</label>
                            <input name = "username" ref = {(c) => {this.username = c;}} placeholder="Enter name"
                                className = {`form-control input-no-border ${errorClass('name')}`}  type="text" />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input name = "email" ref = {(c) => {this.email = c;}} placeholder="Enter name"
                                className = {`form-control input-no-border ${errorClass('email')}`}  type="email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name = "password" ref = {(c) => {this.password = c;}} placeholder="Password"
                                className = {`form-control input-no-border ${errorClass('password')}`}  type="password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm password</label>
                            <input name = "confirm" ref = {(c) => {this.confirm = c;}} placeholder="Confirm password"
                                className = {`form-control input-no-border ${errorClass('confirm')}`}  type="password" />
                        </div>
                    </div>
                    <div className="footer text-center">
                        <button type="submit" className="btn btn-fill btn-wd ">Create and log in</button>
                        <div className="forgot">
                            <Link to = "/signin">Have an account? Log in</Link>
                        </div>
                    </div>
                </div>
            </form>
        );

        return <AuthPage content = {content}/>;
    }
}

JoinPage.contextTypes = {
    router: React.PropTypes.object,
};


function trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

function isValidLength(val) {
    return val.length>= 6 ? true : false;
}