import { Meteor } from 'meteor/meteor';

let DEBUG = true;
let LOG_TAG = "imports/api/users/server/publications";
var _ = require('lodash');

Meteor.publish( 'users', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
    if (DEBUG) {
        console.log(LOG_TAG,"publish-users this.userId : ",this.userId," >>> isAdmin : ",isAdmin);
    }
    if ( isAdmin ) {
        console.log(LOG_TAG,"isAdmin");
        return [
            Meteor.users.find(
                {roles : {$nin : ["admin"]}},
                {
                    fields:
                        {
                            "username" : 1,
                            "emails.address": 1,
                            "roles": 1,
                            "profile" : 1,
                            "pedometer" : 1,
                            "myField" : 1,
                            "profilePictureBase64" : 1,
                            "createdAt" : 1,
                            "pedometerData" : 1,
                            "status" : 1
                        }
                }
            )
        ];
    } else {
        return [];
    }
});


Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find(
            {
                _id: this.userId
            },
            {
                fields: {
                    "username" : 1,
                    "emails.address": 1,
                    "roles": 1,
                    "profile" : 1,
                    "pedometer" : 1,
                    "myField" : 1,
                    "profilePictureBase64" : 1,
                    "createdAt" : 1,
                    "pedometerData" : 1
                }
            }
        );
    } else {
        this.ready();
    }
});


Meteor.publish("userDataByUserId", function (userId) {
    console.log(LOG_TAG,"publish userDataByUserId this.userId : ",this.userId, " >> userId : ",userId);
    if (userId != undefined && userId._id != undefined) {

        console.log(LOG_TAG,"publish userDataByUserId userId._id : ",userId._id);


            return Meteor.users.find(
                {
                    _id: userId._id
                },
                {
                    fields: {
                        "username" : 1,
                        "emails.address": 1,
                        "roles": 1,
                        "profile" : 1,
                        "pedometer" : 1,
                        "myField" : 1,
                        "profilePictureBase64" : 1,
                        "createdAt" : 1,
                        "pedometerData" : 1
                    }
                }
            );
    } else {
        if (this.userId) {
            return Meteor.users.find(
                {
                    _id: userId
                },
                {
                    fields: {
                        "username" : 1,
                        "emails.address": 1,
                        "roles": 1,
                        "profile" : 1,
                        "pedometer" : 1,
                        "myField" : 1,
                        "profilePictureBase64" : 1,
                        "createdAt" : 1,
                        "pedometerData" : 1
                    }
                }
            );
        } else {
            this.ready();
        }
    }

});