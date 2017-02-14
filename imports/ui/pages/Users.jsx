import React from 'react';

import { Link } from 'react-router';
import User from '../components/User.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Users";

var _ = require('lodash');

export default class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    renderUsers(users) {
        console.log(LOG_TAG,"Admin renderUsers");
        return users.map((user) => {
            var isUserAdmin = Roles.userIsInRole(user._id, 'admin');
            console.log(LOG_TAG,"user._id",user._id);
            console.log(LOG_TAG,"Meteor.userId", Meteor.userId());
            if(!isUserAdmin && user._id != Meteor.userId()) {
                return (
                    <li key={user._id}><User user={user} /></li>
                )
            }
        });
    }

    render() {
        const {users} = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }

        return (
            <div className="container-fluid">
                <div className="col-md-6 col-md-offset-3">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Team Members</h4>
                        </div>
                        <div className="content">
                            <ul className="list-unstyled team-members">
                                {users.length > 0 ? this.renderUsers(users) : <p>no users</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}