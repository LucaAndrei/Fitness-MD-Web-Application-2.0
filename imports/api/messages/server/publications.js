import { Meteor } from 'meteor/meteor';
import Messages from '../Messages.js';

let DEBUG = true;
let LOG_TAG = "imports/api/messages/server/publications";


Meteor.publish('messages', function(interlocutorId) {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-messages this.userId : ",this.userId," >>> interlocutorId : ",interlocutorId);
    }
	if (this.userId != null && this.userId !== undefined && interlocutorId != null && interlocutorId !== undefined){
	    return Messages.find({
	      	$or:
	      		[
	      			{
	      				owner: this.userId,
	      				to: interlocutorId
	      			},
	      			{
	      				owner: interlocutorId,
	      				to: this.userId
	      			}
	      		]
	    	}
	    );
	} else return this.ready();
});

