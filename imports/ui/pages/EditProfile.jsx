import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import 'react-dates/lib/css/_datepicker.css';

import NumberInput from 'react-number-input';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/EditProfile";

var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

var _ = require('lodash');


export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        console.log(LOG_TAG,"props : ",props)

        this.state = {
            startDate: moment("1990-01-01"),
            price : 0
        };
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
        this.saveDateOfBirth = this.saveDateOfBirth.bind(this);

        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.saveHeight = this.saveHeight.bind(this);

        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.saveWeight = this.saveWeight.bind(this);

        this.onEmailInputBlur = this.onEmailInputBlur.bind(this);
        this.saveEmail = this.saveEmail.bind(this);

        this.onFNameInputBlur = this.onFNameInputBlur.bind(this);
        this.onLNameInputBlur = this.onLNameInputBlur.bind(this);
        this.saveName = this.saveName.bind(this);


        this.onDescriptionInputBlur = this.onDescriptionInputBlur.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    }

    handleDateOfBirthChange(date) {
        console.log(LOG_TAG,"handleDateOfBirthChange",date);
        this.setState({
          startDate: date
        });
        this.saveDateOfBirth(date);
    }

    saveDateOfBirth(date) {
        console.log(LOG_TAG,"saveDateOfBirth ",Meteor.userId(), " >> date : ", date);
        Meteor.call("updateDateOfBirth", {
            userID: Meteor.userId(),
            newDateOfBirth : date._d.getTime()
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }

    handleHeightChange(event) {
        console.log(LOG_TAG,"handleHeightChange",event.target);
        this.saveHeight();
    }

    saveHeight() {
        console.log(LOG_TAG,"saveHeight ",Meteor.userId(), " >>> newHeight : ",this.height.value);
        Meteor.call("updateHeight", {
            userID: Meteor.userId(),
            newHeight : this.height.value
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }

    handleWeightChange(event) {
        console.log(LOG_TAG,"handleWeightChange",event.target);
        this.saveWeight();
    }

    saveWeight() {
        console.log(LOG_TAG,"saveWeight ",Meteor.userId(), " >>> newWeight : ",this.weight.value);
        Meteor.call("updateWeight", {
            userID: Meteor.userId(),
            newWeight : this.weight.value
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }

    onEmailInputBlur() {
        console.log(LOG_TAG,"onEmailInputBlur");
        this.saveEmail();
    }

    saveEmail() {
        console.log(LOG_TAG,"saveEmail ",Meteor.userId(), " >>> newEmail : ",this.email.value);
        Meteor.call('updateEmail', {
            userID: Meteor.userId(),
            newEmail: this.email.value
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response,'success', 'growl-top-right' );
            }

        });
    }

    onFNameInputBlur() {
        console.log(LOG_TAG,"onFNameInputBlur");
        this.saveName();
    }

    onLNameInputBlur() {
        console.log(LOG_TAG,"onLNameInputBlur");
        this.saveName();
    }

    saveName() {
        console.log(LOG_TAG,"saveName ",Meteor.userId(), " >>> newName : ",this.fname.value,this.lname.value);
        Meteor.call("updateName", {
            userID: Meteor.userId(),
            newName: this.fname.value + " " + this.lname.value
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }

    onDescriptionInputBlur() {
        console.log(LOG_TAG,"onDescriptionInputBlur");
        this.saveDescription();
    }

    saveDescription() {
        console.log(LOG_TAG,"saveDescription ",Meteor.userId(), " >>> newDescription : ",this.description.value);
        Meteor.call("updateDescription", {
            userID: Meteor.userId(),
            newDescription: this.description.value
        }, ( error, response ) => {
            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }






    render () {
        if (DEBUG) {
            console.log(LOG_TAG, "render EditProfile this.props",this.props);
        }
        let user = Meteor.user();
        console.log(LOG_TAG,"user",user);
        var userDateOfBirth = user.profile.dateOfBirth;
        var dob = moment(userDateOfBirth)
        console.log(LOG_TAG,"dob",dob)

        let totalSteps = _.reduce(user.pedometerData, function(sum, n) {
            console.log(LOG_TAG,"sum",sum)
            console.log(LOG_TAG,"n",n)
            return sum + n.steps;

        },0);

        console.log(LOG_TAG,"totalSteps",totalSteps)



        return (
            <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-user">
                            <div className="image">
                                <img src="/img/background.jpg" alt="..."/>
                            </div>
                            <div className="content">
                                <div className="author">
                                  <img className="avatar border-white" src="/img/faces/face-3.jpg" alt="..."/>
                                  <h4 className="title">{user.profile.name}</h4>
                                </div>
                                <p className="description text-center">
                                    {user.profile.description}
                                </p>
                            </div>
                            <hr />
                            <div className="text-center">
                                <div className="row">
                                    <div className="col-md-3 col-md-offset-1">
                                        <h5>{totalSteps}<br /><small>Steps</small></h5>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>{user.profile.weight}<br /><small>Kg</small></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>24,6$<br /><small>Time active</small></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Edit Profile</h4>
                            </div>
                            <div className="content">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control border-input"
                                                    placeholder="Email"
                                                    defaultValue={user.emails[0].address}
                                                    ref={(c) => { this.email = c; }}
                                                    onBlur={this.onEmailInputBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control border-input"
                                                    placeholder="First Name"
                                                    defaultValue={user.profile.name.split(" ")[0]}
                                                    ref={(c) => { this.fname = c; }}
                                                    onBlur={this.onFNameInputBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control border-input"
                                                    placeholder="Last Name"
                                                    defaultValue={user.profile.name.split(" ")[1]}
                                                    ref={(c) => { this.lname = c; }}
                                                    onBlur={this.onLNameInputBlur}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Date of Birth</label>
                                                <DatePicker
                                                    selected = {dob}
                                                    customInput={<ExampleCustomInput />}
                                                    onChange={this.handleDateOfBirthChange}
                                                    dateFormat="DD/MM/YYYY"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Height (cm)</label>
                                                <input
                                                    type="number"
                                                    className="form-control border-input"
                                                    min="120"
                                                    max="150"
                                                    placeholder="Height"
                                                    defaultValue={user.profile.height}
                                                    onChange={this.handleHeightChange}
                                                    ref={(c) => { this.height = c; }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Weight (kg)</label>
                                                <input
                                                    type="number"
                                                    className="form-control border-input"
                                                    min="120"
                                                    max="150"
                                                    placeholder="Weight"
                                                    defaultValue={user.profile.weight}
                                                    onChange={this.handleWeightChange}
                                                    ref={(c) => { this.weight = c; }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>About Me</label>
                                                <textarea
                                                    rows="3"
                                                    className="form-control border-input"
                                                    placeholder="Personal description"
                                                    defaultValue={user.profile.description}
                                                    ref={(c) => { this.description = c; }}
                                                    onBlur={this.onDescriptionInputBlur}>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}


class ExampleCustomInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log(LOG_TAG,"this.props",this.props)
        return (
            <input onClick={this.props.onClick} defaultValue={this.props.value} type="text" className="form-control border-input" placeholder="Date of birth" />
        )
    }
}