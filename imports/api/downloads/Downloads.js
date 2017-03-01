Downloads = new Mongo.Collection( 'downloads' );

Downloads.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Downloads.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let DownloadsSchema = new SimpleSchema({
	'_id' : {
		type : String,
		defaultValue : 'numberOfDownloads'
	},
    'count': {
        type: Number,
        defaultValue : 0
    }
});

Downloads.attachSchema( DownloadsSchema );

export default Downloads;