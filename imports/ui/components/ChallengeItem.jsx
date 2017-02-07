import React from 'react';

import { Link } from 'react-router';


import AlertModal from './AlertModal.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChallengeItem";

var _ = require('lodash');

export default class ChallengeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { showModal: false});
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.registerChallenge = this.registerChallenge.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.close = this.close.bind(this);
    }


    deleteChallenge() {
        console.log("deleteChallenge",this.props.challenge._id);

        this.setState({ showModal: true});
    }

    cancelDelete() {
        console.log("cancelDelete");
        this.setState({ showModal: false});
    }


    registerChallenge(event) {
        console.log("isRegistering",event.target.value)
        let isRegistering = event.target.value == "give_up" ? false : true;
        Meteor.call("registerChallenge", {
            userID : Meteor.userId(),
            challengeId: this.props.challenge._id,
            registering : isRegistering
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, "Deleted challenge!" );
            }

        });
    }

    onConfirm() {
        console.log("onConfirm")
        Meteor.call("deleteChallenge", {
            challengeId: this.props.challenge._id
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, "Deleted challenge!" );
            }

        });
    }


    close() {
        this.setState({ showModal: false});
    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        const {difficulty, text, type} = this.props.challenge;
        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        let dataColor = "orange";
        if (type == "Strength") {
            dataColor = "purple";
        } else if (type == "Endurance") {
            dataColor = "brown";
        }
        let isRegistered = false;
        let challenge = this.props.challenge;
        console.log("challenge",challenge)
        if (challenge.hasOwnProperty('registeredUsers')) {
            console.log("challenge.registeredUsers", challenge.registeredUsers)
            let found = false;
            challenge.registeredUsers.map(function(user) {
                console.log("user",user);
                if (user == Meteor.userId()) {
                    console.log("found !!!!");
                    found = true;
                }
            })

            console.log("found",found);

            isRegistered = found;
        }

        console.log("isRegistered",isRegistered)


        return (
            <div className="col-lg-3 col-sm-6">
                <div className="card card-circle-chart" data-background="color" data-color={dataColor}>
                    <div className="header text-center">
                        <h5 className="title">{difficulty}</h5>
                        <p className="description">{type}</p>
                    </div>
                    <div className="content">
                        <p className="text-center">{text}</p>
                        {
                            isUserAdmin
                                ?
                                    <div>
                                        <button type="submit" className="btn btn-fill btn-challenge" onClick={this.deleteChallenge}><i className="fa fa-trash-o"></i></button>
                                        <button type="submit" className="btn btn-fill btn-challenge" onClick={this.editChallenge}><i className = "fa fa-edit"></i></button>
                                    </div>
                                :
                                    (
                                        isRegistered
                                            ?   <button type="submit" className="btn btn-fill btn-challenge" onClick={this.registerChallenge} value="give_up">Give up</button>
                                            :   <button type="submit" className="btn btn-fill btn-challenge" onClick={this.registerChallenge} value="take_it">Take it</button>
                                    )
                        }
                    </div>
                </div>
                {
                    this.state.showModal
                        ?
                            <AlertModal
                                onHide={this.close}
                                show={this.state.showModal}
                                onConfirm={this.onConfirm}
                                body="Are you sure you want to delete this?"
                                confirmText="Confirm Delete"
                                title="Delete challenge?">
                                <button>Delete Stuff</button>
                            </AlertModal>
                        :""
                }
            </div>
        )
    }
}