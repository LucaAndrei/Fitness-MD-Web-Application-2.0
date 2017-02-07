Advices = new Mongo.Collection( 'advices' );

Advices.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Advices.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let AdvicesSchema = new SimpleSchema({
    'to': {
        type: String,
        label: 'The ID of the user this message was sent directly to.',
        optional: true
    },
    'toName': {
        type: String,
        label: 'The ID of the user this message was sent directly to.',
        optional: true
    },
    'owner': {
        type: String,
        label: 'The ID of the user that created this message.'
    },
    'ownerName': {
        type: String,
        label: 'The ID of the user that created this message.'
    },
    'timestamp': {
        type: Date,
        label: 'The date and time this message was created.'
    },
    'message': {
        type: String,
        label: 'The content of this message.'
    }
});

Advices.attachSchema( AdvicesSchema );

export default Advices;