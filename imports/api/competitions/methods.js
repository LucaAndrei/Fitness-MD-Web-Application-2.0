import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import MapPointSchema from './MapPoint'

let DEBUG = true;
let LOG_TAG = "imports/api/competitions/methods";


export const insertCompetition = new ValidatedMethod({
    name : 'insertCompetition',
    validate : new SimpleSchema({
        'createdBy' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'date': {
            type: String
        },
        'origin' : {
            type : MapPointSchema
        },
        'destination' : {
            type : MapPointSchema
        },
        'hasIntermediatePoint' : {
            type : Boolean
        },
        'intermediate' : {
            type : MapPointSchema,
            optional : true
        },
        'distance': {
            type: Number,
            decimal : true
        },
        'availablePlaces' : {
            type : Number
        }
    }).validator(),
    run({createdBy, date, origin, destination, hasIntermediatePoint, intermediate, distance, availablePlaces}) {
        console.log(LOG_TAG,"createdBy",createdBy);
        console.log(LOG_TAG,"date",date);
        console.log(LOG_TAG,"origin",origin);
        console.log(LOG_TAG,"destination",destination);
        console.log(LOG_TAG,"hasIntermediatePoint",hasIntermediatePoint);
        console.log(LOG_TAG,"iintermediate",intermediate);
        console.log(LOG_TAG,"distance",distance);
        const competitionToInsert = {
            createdBy,
            date,
            origin,
            destination,
            hasIntermediatePoint,
            intermediate,
            distance,
            availablePlaces
        }
        console.log(LOG_TAG,"competitionToInsert",competitionToInsert);
        try {
            var inserted =  Competitions.insert( competitionToInsert );
            console.log(LOG_TAG,"inserted competition",inserted);
            return inserted;
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})

export const deleteCompetition = new ValidatedMethod({
    name : 'deleteCompetition',
    validate : new SimpleSchema({
        'competitionId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator(),
    run({competitionId}) {
        console.log(LOG_TAG,"competitionId",competitionId);
        try {
            var removed =  Competitions.remove({_id : competitionId});
            console.log(LOG_TAG,"removed competition",removed);
            return "success removed";
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})



export const registerCompetition = new ValidatedMethod({
    name : 'registerCompetition',
    validate : new SimpleSchema({
        'userID' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'competitionId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        'registering' : {
            type : Boolean
        }

    }).validator(),
    run({userID, competitionId, registering}) {
        console.log(LOG_TAG,"userID",userID);
        console.log(LOG_TAG,"competitionId",competitionId);
        console.log(LOG_TAG,"registering",registering);
        try {
            if (registering) {
                var subscribeCompetition =  Competitions.update({_id : competitionId}, {$addToSet : {'registeredUsers' : userID}, $inc : {'availablePlaces' : -1}});
                console.log(LOG_TAG,"subscribeCompetition to competition",subscribeCompetition);
                return "success subscribed";
            } else {
                var unsubscribeCompetition =  Competitions.update({_id : competitionId}, {$pull : {'registeredUsers' : userID}, $inc : {'availablePlaces' : +1}});
                console.log(LOG_TAG,"unsubscribed from competition",unsubscribeCompetition);
                return "success unsubscribed";
            }
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})
