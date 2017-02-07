import { Meteor } from 'meteor/meteor';
import Challenges from '../Challenges.js';

let DEBUG = true;
let LOG_TAG = "imports/api/challenges/server/publications";


Meteor.publish('challenges', function(interlocutorId) {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-challenges this.userId : ",this.userId);
    }
	if (this.userId != null && this.userId !== undefined){
	    return Challenges.find({});
	} else return this.ready();
});