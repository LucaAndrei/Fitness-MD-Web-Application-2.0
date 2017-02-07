import { Meteor } from 'meteor/meteor';
import Advices from '../Advices.js';

let DEBUG = true;
let LOG_TAG = "imports/api/advices/server/publications";


Meteor.publish('advices', function(interlocutorId) {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-advices this.userId : ",this.userId," >>> interlocutorId : ",interlocutorId);
    }
	if (interlocutorId != null && interlocutorId !== undefined){
	    return Advices.find({});
	} else return this.ready();
});