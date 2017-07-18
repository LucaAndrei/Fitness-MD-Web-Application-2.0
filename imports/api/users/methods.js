import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let DEBUG = true;
let LOG_TAG = "imports/api/users/methods";

export const assignDoctor = new ValidatedMethod({
    name : 'assignDoctor',
    validate : new SimpleSchema({
        userId: { type: String, regEx: SimpleSchema.RegEx.Id},
        doctorId: { type: String, regEx: SimpleSchema.RegEx.Id},
        shouldAssign : {type : Boolean}
    }).validator(),
    run({userId, doctorId, shouldAssign}) {
        if (DEBUG) {
            console.log(LOG_TAG,"assignDoctor userId : ",userId, " >>> doctorId : ",doctorId, " >>> shouldAssign : ", shouldAssign);
        }
        let result;
        if(shouldAssign) {
            result = Meteor.users.update(userId, {
                $set : {
                    "profile.assignedDoctorId" : doctorId
                }
            });
        } else {
            result = Meteor.users.update(userId, {
                $unset : {
                    "profile.assignedDoctorId" : ""
                }
            });
        }
        if (DEBUG) {
            console.log(LOG_TAG,"assignDoctor result : ",result);
        }
    }
})

export const insertPedometerData = new ValidatedMethod({
    name : 'insertPedometerData',
    validate : new SimpleSchema({
        userIdToInsert: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        steps : {
            type : Number
        },
        'day' : {
            type : Number
        },
        'kCalBurned' : {
            type : Number
        },
        'timeActive' : {
            type : Number
        }
    }).validator(),
    run({userIdToInsert,steps,day,kCalBurned, timeActive}) {
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData userIdToInsert : ",userIdToInsert, " >>> steps : ",steps, " >>> day : ", day, " >>> kCalBurned : ", kCalBurned , " >>> timeActive : ", timeActive);
        }

        var date = new Date(day);
        console.log(LOG_TAG,"date",date);
        var hours = date.getHours();
        console.log(LOG_TAG,"hours",hours);

        var result = Meteor.users.update(
            {_id : userIdToInsert},
            { $push :
                {'pedometer' :
                    {
                        steps : steps,
                        day : day,
                        kCalBurned : kCalBurned,
                        timeActive : timeActive
                    }
                }
            });
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData result : ",result);
        }
    }
})


export const insertProfilePicture = new ValidatedMethod({
    name : 'insertProfilePicture',
    validate : new SimpleSchema({
        userIdToInsert: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        base64String: {
            type: String,
        }
    }).validator(),
    run({userIdToInsert,base64String}) {
        if (DEBUG) {
            console.log(LOG_TAG,"insertProfilePicture base64String : ");//,base64String);
        }


        var result = Meteor.users.upsert(
            {_id : userIdToInsert},
            { $set :
                {'profilePictureBase64' : base64String }
            });
        if (DEBUG) {
            console.log(LOG_TAG,"insertProfilePicture result : ",result);
        }
    }
})


export const updateStepsForToday = new ValidatedMethod({
    name : 'updateStepsForToday',
    validate : new SimpleSchema({
        userId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        startOfDay: {
            type: Number
        },
        steps: {
            type: Number
        },
        hourIndex : {
            type : Number
        }
    }).validator(),
    run({userId,startOfDay,steps, hourIndex}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateStepsForToday userId : ",userId, " >> startOfDay : ",startOfDay, " >> steps : ",steps, " >> hourIndex : ",hourIndex);
        }


        /*var result = Meteor.users.upsert(
            {_id : userId},
            { $set :
                {'profilePictureBase64' : base64String }
            });
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData result : ",result);
        }*/

        var resultUpdate = Meteor.users.update(
            {
                _id : userId,
                'pedometerData' : {
                    $elemMatch : {
                        'day' : startOfDay,
                        'hourIndex' : hourIndex
                    }
                }
            },
            {$set : {
                'pedometerData.$.steps' : steps}
            }
        )

        console.log(LOG_TAG,"resultUpdate",resultUpdate);

        if (resultUpdate == 0) {
            var addToSetResult = Meteor.users.update({_id : userId},
            {$addToSet :
                {'pedometerData' : {
                    'day' : startOfDay,
                    'hourIndex' : hourIndex,
                    'steps' : steps
                }}
            })
            console.log(LOG_TAG,"addToSetResult",addToSetResult)
        }


        /*'Users.methods.address.insert'(data) {
            data.hid = Utils.hashId();
            Meteor.users.update( this.userId, {$push: {'buyer.addresses': data}} )
        },
        'Users.methods.address.update'(data) {
            Meteor.users.update( {_id: this.userId, 'buyer.addresses.hid': data.hid},
                {$set: {'buyer.addresses.$': data}} )
        },
        'Users.methods.address.remove'(hid) {
            Meteor.users.update( {_id: this.userId},
                {$pull: {'buyer.addresses': {hid: hid}}} )
        }*/
    }
})




export const updateDateOfBirth = new ValidatedMethod({
    name : 'updateDateOfBirth',
    validate : new SimpleSchema({
        userID: { type: String},
        newDateOfBirth: { type: Number}
    }).validator(),
    run({userID, newDateOfBirth}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateDateOfBirth userID : ",userID, " >>> newDateOfBirth : ",newDateOfBirth);
        }

        try {
            var updatedUsersDateOfBirth = Meteor.users.update(userID, {
                $set: { 'profile.dateOfBirth': newDateOfBirth },
            });
            console.log(LOG_TAG,"updateDateOfBirth",updatedUsersDateOfBirth);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});


export const updateHeight = new ValidatedMethod({
    name : 'updateHeight',
    validate : new SimpleSchema({
        userID: { type: String},
        newHeight: { type: String}
    }).validator(),
    run({userID, newHeight}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateHeight userID : ",userID, " >>> newHeight : ",newHeight);
        }

        try {
            var updatedUsersHeight = Meteor.users.update(userID, {
                $set: { 'profile.height': newHeight },
            });
            console.log(LOG_TAG,"updatedUsersHeight",updatedUsersHeight);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});


export const updateWeight = new ValidatedMethod({
    name : 'updateWeight',
    validate : new SimpleSchema({
        userID: { type: String},
        newWeight: { type: String}
    }).validator(),
    run({userID, newWeight}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateWeight userID : ",userID, " >>> newWeight : ",newWeight);
        }

        try {
            var updatedUsersWeight = Meteor.users.update(userID, {
                $set: { 'profile.weight': newWeight },
            });
            console.log(LOG_TAG,"updatedUsersWeight",updatedUsersWeight);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});


export const updateEmail = new ValidatedMethod({
    name : 'updateEmail',
    validate : new SimpleSchema({
        userID: { type: String},
        newEmail: { type: String}
    }).validator(),
    run({userID, newEmail}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateEmail userID : ",userID, " >>> newEmail : ",newEmail);
        }

        try {
            var updatedUsersEmail = Meteor.users.update(userID, {
                $set: { 'emails.0.address': newEmail },
            });
            console.log(LOG_TAG,"updatedUsersEmail",updatedUsersEmail);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});


export const updateName = new ValidatedMethod({
    name : 'updateName',
    validate : new SimpleSchema({
        userID: { type: String},
        newName: { type: String}
    }).validator(),
    run({userID, newName}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateName userID : ",userID, " >>> newName : ",newName);
        }

        try {
            var updatedUsersName = Meteor.users.update(userID, {
                $set: { 'profile.name': newName },
            });
            console.log(LOG_TAG,"updatedUsersName",updatedUsersName);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});

export const updateDescription = new ValidatedMethod({
    name : 'updateDescription',
    validate : new SimpleSchema({
        userID: { type: String},
        newDescription: { type: String}
    }).validator(),
    run({userID, newDescription}) {
        if (DEBUG) {
            console.log(LOG_TAG,"updateDescription userID : ",userID, " >>> newDescription : ",newDescription);
        }

        try {
            var updatedUsersDescription = Meteor.users.update(userID, {
                $set: { 'profile.description': newDescription },
            });
            console.log(LOG_TAG,"updatedUsersDescription",updatedUsersDescription);
            return "success update";
        } catch( exception ) {
            return exception;
        }
    }
});


export const deleteUser = new ValidatedMethod({
    name : 'deleteUser',
    validate : new SimpleSchema({
        'userId' : {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator(),
    run({userId}) {
        console.log(LOG_TAG,"userId",userId);
        try {
            var removed =  Meteor.users.remove({_id : userId});
            console.log(LOG_TAG,"removed user",removed);
            return "success removed";
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})