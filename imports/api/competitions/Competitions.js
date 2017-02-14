import MapPointSchema from './MapPoint'
Competitions = new Mongo.Collection( 'competitions' );


Competitions.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Competitions.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});



let CompetitionsSchema = new SimpleSchema({
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
    'registeredUsers': {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional : true
    },
    'availablePlaces' : {
        type : Number
    }
});

Competitions.attachSchema( CompetitionsSchema );

export default Competitions;