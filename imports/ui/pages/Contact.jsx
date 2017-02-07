import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Contact";

var _ = require('lodash');

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = _.assign(this.state, {
            errors: {}
        });

        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(event) {
        event.preventDefault();
        console.log(LOG_TAG, "onSubmit this", this);
        const name = this.name.value;
        const email = trimInput(this.email.value);
        const message = this.message.value;
        const errors = {};

        if (!email) {
            errors.email = "email required";
        }
        if(!name) {
            errors.name = "name required";
        }
        if(!message) {
            errors.message = "message required";
        }


        console.log(LOG_TAG, "email", email);
        console.log(LOG_TAG, "message", message);
        this.setState({
            errors
        });
        if (Object.keys(errors).length) {
            return;
        }

        const messageToInsert = {
            name,
            email,
            message
        };

        Meteor.call( 'insertContactMessage', messageToInsert, ( error ) => {
            if ( error ) {
                console.error(LOG_TAG,"ERROR INSERTING CONTACT MESSAGE",error);
            } else {
                if (DEBUG) {
                    console.log(LOG_TAG,"CONTACT MESSAGE WAS INSERTED SUCCESSFULLY" );
                }
            }
        });
    }

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }

        const {
            errors
        } = this.state;

        const errorMessages = _.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className = "col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3 auth-page">
                <form onSubmit = {this.onSubmit}>
                    <div className="card" data-background="color" data-color="blue">
                        <div className="header">
                            <h3 className="title">Send us a message. Tell us how we can improve</h3>
                        </div>
                        <div className="content">
                            <div className="form-group">
                                <label>Name</label>
                                <input name = "name" ref = {(c) => {this.name = c;}} placeholder="Enter name"
                                    className = {`form-control input-no-border ${errorClass('name')}`}  type="text" />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input name = "email" ref = {(c) => {this.email = c;}} placeholder="E-mail"
                                    className = {`form-control input-no-border ${errorClass('email')}`}  type="email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <textarea name = "message" ref = {(c) => {this.message = c;}} placeholder="Message"
                                    className = {`form-control input-no-border ${errorClass('message')}`}  type="text" />
                            </div>
                        </div>
                        <div className="footer text-center">
                            <button type="submit" className="btn btn-fill btn-wd ">Send message</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

function isValidLength(val) {
    return val.length>= 6 ? true : false;
}