import { Meteor } from 'meteor/meteor';
import Downloads from '../Downloads.js';

let DEBUG = true;
let LOG_TAG = "imports/api/downloads/server/publications";


Meteor.publish('downloads', function() {
	if (DEBUG) {
       	console.log(LOG_TAG,"publish-downloads",Downloads.find({}).fetch());
    }
	return Downloads.find({});
});