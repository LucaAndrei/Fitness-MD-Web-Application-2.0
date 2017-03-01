import React from 'react';

import { Link } from 'react-router';


import AlertModal from './AlertModal.jsx';
import ChallengeModal from './ChallengeModal.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChallengeItem";

var _ = require('lodash');

export default class ChallengeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, {
            showModal: false,
            editing : false,
            challengeType : props.challenge.type,
            challengeDifficulty : props.challenge.difficulty,
            challengeText : props.challenge.text
        });
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.editChallenge = this.editChallenge.bind(this);
        this.registerChallenge = this.registerChallenge.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.close = this.close.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectDifficulty = this.onSelectDifficulty.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }


    deleteChallenge() {
        console.log(LOG_TAG,"deleteChallenge",this.props.challenge._id);

        this.setState({ showModal: true});
    }

    editChallenge() {
        console.log(LOG_TAG,"editChallenge",this.props.challenge._id);

        this.setState({ editing: true });
    }

    cancelDelete() {
        console.log(LOG_TAG,"cancelDelete");
        this.setState({ showModal: false});
    }


    onSelectType(event) {
        console.log(LOG_TAG,"onSelectType",event.target.value);
        this.setState({challengeType: event.target.value});
    }


    onSelectDifficulty(event) {
        console.log(LOG_TAG,"onSelectDifficulty",event.target.value);
        this.setState({challengeDifficulty: event.target.value});
    }

    onChangeDescription(event) {
        console.log(LOG_TAG,"onChangeDescription",event.target.value);
        this.setState({challengeText: event.target.value});
    }


    closeEdit() {
        console.log(LOG_TAG,"closeEdit",this.props)
        this.setState({
            editing : false,
            challengeType : this.props.challenge.type,
            challengeDifficulty : this.props.challenge.difficulty,
            challengeText : this.props.challenge.text
        });
    }


    onSave() {
        console.log(LOG_TAG,"onSave",this);
        console.log(LOG_TAG,"chType",this.chType.value)
        console.log(LOG_TAG,"chDifficulty",this.chDifficulty.value)
        console.log(LOG_TAG,"chDescription",this.chDescription.value)
        let self = this;
        Meteor.call("updateChallenge", {
                challengeId : this.props.challenge._id,
                createdBy: Meteor.userId(),
                difficulty : this.state.challengeDifficulty,
                type : this.state.challengeType,
                text : this.state.challengeText
            }, ( error, response ) => {

                if ( error ) {
                    console.log(LOG_TAG,"error",error);
                    Bert.alert( error.reason, "warning" , 'growl-top-right' );
                } else if (response) {
                    console.log(LOG_TAG,"response",response);
                    Bert.alert( response, 'success', 'growl-top-right' );
                    this.setState({
                        editing : false,
                        challengeType : this.state.challengeType,
                        challengeDifficulty : this.state.challengeDifficulty,
                        challengeText : this.state.challengeText
                    });
                }

            });
      }


    registerChallenge(event) {
        console.log(LOG_TAG,"isRegistering",event.target.value)
        let isRegistering = event.target.value == "give_up" ? false : true;
        Meteor.call("registerChallenge", {
            userID : Meteor.userId(),
            challengeId: this.props.challenge._id,
            registering : isRegistering
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning", 'growl-top-right'  );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
            }

        });
    }

    onConfirm() {
        console.log(LOG_TAG,"onConfirm")
        Meteor.call("deleteChallenge", {
            challengeId: this.props.challenge._id
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
        console.log(LOG_TAG,"challenge",challenge)
        if (challenge.hasOwnProperty('registeredUsers')) {
            console.log(LOG_TAG,"challenge.registeredUsers", challenge.registeredUsers)
            let found = false;
            challenge.registeredUsers.map(function(user) {
                console.log(LOG_TAG,"user",user);
                if (user == Meteor.userId()) {
                    console.log(LOG_TAG,"found !!!!");
                    found = true;
                }
            })

            console.log(LOG_TAG,"found",found);

            isRegistered = found;
        }

        console.log(LOG_TAG,"isRegistered",isRegistered)

        const { editing } = this.state;


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

                {
                    editing
                        ?
                            <ChallengeModal
                                show={this.state.editing}
                                onHide={this.closeEdit}
                                isCreating = {editing}
                                isUserAdmin = {isUserAdmin}
                                onSave = {this.onSave}>
                                    <h4>Type</h4>
                                    <select
                                        className="form-control"
                                        onChange={this.onSelectType}
                                        ref={(c) => { this.chType = c; }}
                                        value = {this.state.challengeType}
                                    >
                                        <option disabled value="default">
                                           Select challenge type
                                        </option>
                                        <option value="Endurance">Endurance</option>
                                        <option value="Strength">Strength</option>
                                        <option value="Speed">Speed</option>
                                    </select>
                                    <h4>Difficulty</h4>
                                    <select
                                        className="form-control"
                                        onChange={this.onSelectDifficulty}
                                        ref={(c) => { this.chDifficulty = c; }}
                                        value = {this.state.challengeDifficulty}
                                    >
                                        <option disabled value="default">
                                           Select challenge difficulty
                                        </option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                    <h4>Description</h4>
                                    <textarea
                                        rows="5"
                                        className="form-control border-input"
                                        placeholder="Here can be your description"
                                        onChange={this.onChangeDescription}
                                        ref={(c) => { this.chDescription = c; }}
                                        value = {this.state.challengeText}>
                                    </textarea>
                            </ChallengeModal>
                        :   ""
                }


            </div>
        )
    }
}