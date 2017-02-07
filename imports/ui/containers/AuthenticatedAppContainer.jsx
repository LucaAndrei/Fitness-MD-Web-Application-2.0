import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import AuthenticatedApp from '../layouts/AuthenticatedApp.jsx';

import Challenges from '../../api/challenges/Challenges.js';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/AuthenticatedAppContainer";

export default createContainer(() => {
    const usersHandle = Meteor.subscribe('users', {roles : {$nin : ["admin"]}});
    const userDataHandle = Meteor.subscribe('userData');

    const challengesHandle = Meteor.subscribe('challenges');

    if (DEBUG) {
        console.log(LOG_TAG, "createContainer allUsers : ",Meteor.users.find({roles : {$nin : ["admin"]}}).fetch());
    }

    return {
        user: Meteor.user(),
        menuOpen: Session.get('menuOpen'),
        loading: !(usersHandle.ready() && userDataHandle.ready() && challengesHandle.ready()),
        allUsers: Meteor.users.find({roles : {$nin : ["admin"]}}).fetch(),
        challenges: Challenges.find({}).fetch()
    };
}, AuthenticatedApp);