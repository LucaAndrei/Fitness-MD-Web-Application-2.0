import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/AppContainer";

export default createContainer(() => {
    const usersHandle = Meteor.subscribe('users');

    if (DEBUG) {
        console.log(LOG_TAG, "createContainer allUsers : ",Meteor.users.find({}).fetch());
    }
    console.log("usersHandle",usersHandle.ready())
    return {
        user: Meteor.user(),
        menuOpen: Session.get('menuOpen'),
        loading: !(usersHandle.ready()),
    };
}, App);