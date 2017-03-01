import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let DEBUG = true;
let LOG_TAG = "imports/api/messages/methods";


export const insertChallenge = new ValidatedMethod({
    name : 'insertChallenge',
    validate : new SimpleSchema({
        'createdBy' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'difficulty': {
            type: String
        },
        'type': {
            type: String
        },
        'text': {
            type: String
        }
    }).validator(),
    run({createdBy, difficulty, type, text}) {
        console.log(LOG_TAG,"createdBy",createdBy);
        console.log(LOG_TAG,"difficulty",difficulty);
        console.log(LOG_TAG,"type",type);
        console.log(LOG_TAG,"text",text);
        const challengeToInsert = {
            createdBy,
            difficulty,
            type,
            text
        }
        console.log(LOG_TAG,"challengeToInsert",challengeToInsert);
        try {
            var inserted =  Challenges.insert( challengeToInsert );
            console.log(LOG_TAG,"inserted challenge",inserted);
            return "success inserted";
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})

export const updateChallenge = new ValidatedMethod({
    name : 'updateChallenge',
    validate : new SimpleSchema({
        'challengeId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'createdBy' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'difficulty': {
            type: String
        },
        'type': {
            type: String
        },
        'text': {
            type: String
        }
    }).validator(),
    run({challengeId, createdBy, difficulty, type, text}) {
        console.log(LOG_TAG,"updateChallenge");
        console.log(LOG_TAG,"challengeId",challengeId);
        console.log(LOG_TAG,"createdBy",createdBy);
        console.log(LOG_TAG,"difficulty",difficulty);
        console.log(LOG_TAG,"type",type);
        console.log(LOG_TAG,"text",text);
        try {
            var updated =  Challenges.update({_id : challengeId }, {
                $set : {
                    'difficulty' : difficulty,
                    'type' : type,
                    'text' : text
                }
            } );
            console.log(LOG_TAG,"updated challenge",updated);
            return "success updated";
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})


export const deleteChallenge = new ValidatedMethod({
    name : 'deleteChallenge',
    validate : new SimpleSchema({
        'challengeId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator(),
    run({challengeId}) {
        console.log(LOG_TAG,"challengeId",challengeId);
        try {
            var removed =  Challenges.remove({_id : challengeId});
            console.log(LOG_TAG,"removed challenge",removed);
            return "success removed";
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})



export const registerChallenge = new ValidatedMethod({
    name : 'registerChallenge',
    validate : new SimpleSchema({
        'userID' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'challengeId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'registering' : {
            type : Boolean
        }

    }).validator(),
    run({userID, challengeId, registering}) {
        console.log(LOG_TAG,"userID",userID);
        console.log(LOG_TAG,"challengeId",challengeId);
        console.log(LOG_TAG,"registering",registering);
        try {
            if (registering) {
                var subscribeChallenge =  Challenges.update({_id : challengeId}, {$addToSet : {'registeredUsers' : userID}});
                console.log(LOG_TAG,"subscribeChallenge to challenge",subscribeChallenge);
                return "success subscribed";
            } else {
                var unsubscribeChallenge =  Challenges.update({_id : challengeId}, {$pull : {'registeredUsers' : userID}});
                console.log(LOG_TAG,"unsubscribed from challenge",unsubscribeChallenge);
                return "success unsubscribed";
            }
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})
