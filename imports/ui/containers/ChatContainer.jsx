import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Messages from '../../api/messages/Messages.js';
import ChatBox from '../components/ChatBox.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/ChatContainer";

export default createContainer(({ params: { interlocutorId } }) => {
    const messagesHandle = Meteor.subscribe('messages', interlocutorId);

    if (DEBUG) {
        console.log(LOG_TAG, "params interlocutorId", interlocutorId);
        console.log(LOG_TAG, "createContainer messages : ",Messages.find({}, { sort: { timestamp: 1 } }).fetch());
    }
    return {
        user: Meteor.user(),
        loading: !(messagesHandle.ready()),
        messages: Messages.find({}, { sort: { timestamp: 1 } }).fetch()
    };
}, ChatBox);