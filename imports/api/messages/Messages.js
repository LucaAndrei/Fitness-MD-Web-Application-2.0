Messages = new Mongo.Collection( 'messages' );

Messages.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Messages.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let MessagesSchema = new SimpleSchema({
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

Messages.attachSchema( MessagesSchema );

export default Messages;