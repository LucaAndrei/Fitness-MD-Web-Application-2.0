import React from 'react';

import { Link } from 'react-router';
import MessagesUserlistUser from '../components/MessagesUserlistUser.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/MessagesUserlist";

export default class MessagesUserlist extends React.Component {
    constructor(props) {
        super(props);

    }


    renderUsers(myUsers) {
        return myUsers.map((user) => {
            //if (user._id != Meteor.userId()) {
                return (
                    <Link to = {`/app/chat/${user._id}`} key = {user._id}>
                        <li><MessagesUserlistUser user={user}/></li>
                    </Link>
                )
            //}
        });
    }

    render() {
        const {
            user,
            users
        } = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        console.log("users.length",users.length);
        return (
            <div className="content-scrollable container-fluid">
                <h1>Should i use this anymore if i already have users page with link to message user?</h1>
                <div className="col-md-4 col-xs-12 col-md-offset-4">
                    <div className="col-md-12 container_ui__heading"><p>inbox</p></div>
                    <ul className="userList">
                        {
                            users.length > 0 ? <p>no users</p> : this.renderUsers(users)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}