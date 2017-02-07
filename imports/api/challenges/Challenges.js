Challenges = new Mongo.Collection( 'challenges' );

Challenges.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Challenges.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let ChallengesSchema = new SimpleSchema({
    'createdBy' : {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    'difficulty': {
        type: String,
        label: 'The difficulty of the challenge. Can be : Begginer, Intermediate, Advanced'
    },
    'type': {
        type: String,
        label: 'The type of challenge. Can be : Endurance, Strength, Speed'
    },
    'text': {
        type: String,
        label: 'Text of the challenge'
    },
    'registeredUsers': {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional : true
    }
});

Challenges.attachSchema( ChallengesSchema );

export default Challenges;