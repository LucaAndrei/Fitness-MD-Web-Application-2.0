import { Meteor } from 'meteor/meteor';
import Competitions from '../Competitions.js';

let DEBUG = true;
let LOG_TAG = "imports/api/competitions/server/publications";


Meteor.publish('competitions', function() {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-competitions this.userId : ",this.userId);
    }
    var date = new Date().toISOString();
	if (this.userId != null && this.userId !== undefined){
	    return Competitions.find({"date" : {$gte : ""+date} });
	} else return this.ready();
});

Meteor.publish('competition', function(competitionId) {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-competitions this.userId : ",this.userId, " >> competitionId",competitionId);
    }

	if (this.userId != null && this.userId !== undefined){
	    return Competitions.find({_id : competitionId});
	} else return this.ready();
});