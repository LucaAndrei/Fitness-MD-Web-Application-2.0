import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


let DEBUG = true;
let LOG_TAG = "imports/api/downloads/methods";

export const insertDownload = new ValidatedMethod({
    name : 'insertDownload',
    validate: new SimpleSchema({}).validator(),
    run({}) {
        if (DEBUG) {
            console.log(LOG_TAG,"insertDownload");
        }

        try {
            console.log(Downloads.find({}).fetch())
            var insertedDownload = Downloads.update({_id : 'numberOfDownloads'},{
                $inc: { 'count': 1 },
            });
            console.log(LOG_TAG,"insertedDownload",insertedDownload);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});
