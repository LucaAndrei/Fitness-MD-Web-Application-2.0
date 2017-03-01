import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

import ChallengeCreator from '../components/ChallengeCreator.jsx';
import ChallengeModal from '../components/ChallengeModal.jsx';
import ChallengeItem from '../components/ChallengeItem.jsx';


import Chartist from 'chartist';


var _ = require('lodash');
require('chartist-plugin-legend');


let LOG_TAG = "imports/ui/pages/Challenges";

export default class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { editing: false, creating : false, showModal : false });

        this.createChallenge = this.createChallenge.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);


        this.openModal = this.openModal.bind(this);


        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectDifficulty = this.onSelectDifficulty.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);


        this.onSave = this.onSave.bind(this);
        this.takeChallenge = this.takeChallenge.bind(this);

    }

  createChallenge() {
    console.log(LOG_TAG,"createChallenge");
    this.setState({ creating: true, showModal : true });
  }


  close() {
    this.setState({ showModal: false, creating: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  openModal() {
    console.log(LOG_TAG,"openModal",this);
  }


  onSelectType(event) {
    console.log(LOG_TAG,"onSelectType",event.target.value);
  }

  onSelectDifficulty(event) {
    console.log(LOG_TAG,"onSelectDifficulty",event.target.value);
  }

  onChangeDescription(event) {
    console.log(LOG_TAG,"onChangeDescription",event.target.value);
  }


  onSave() {
    console.log(LOG_TAG,"onSave",this);
    console.log(LOG_TAG,"chType",this.chType.value)
    console.log(LOG_TAG,"chDifficulty",this.chDifficulty.value)
    console.log(LOG_TAG,"chDescription",this.chDescription.value)
    let self = this;
    Meteor.call("insertChallenge", {
            createdBy: Meteor.userId(),
            difficulty : this.chDifficulty.value,
            type : this.chType.value,
            text : this.chDescription.value
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success', 'growl-top-right' );
                this.close();
            }

        });
  }


  takeChallenge() {
    console.log(LOG_TAG,"takeChallenge",this);
    console.log(LOG_TAG,"chType",this.chType.value)
    console.log(LOG_TAG,"chDifficulty",this.chDifficulty.value)
    console.log(LOG_TAG,"chDescription",this.chDescription.value)
  }





    render() {
        console.log(LOG_TAG,"Challenges this.props", this.props);
        const { challenges } = this.props;
        const { editing, creating } = this.state;
        console.log(LOG_TAG,"this.state",this.state)


        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        console.log(LOG_TAG,"isUserAdmin",isUserAdmin);


        let Challenges = challenges.map(challenge => (
                <ChallengeItem
                    challenge = {challenge}
                    key = {challenge._id}
                />
            ))


        return (
            <div className="container-fluid">
                {
                    isUserAdmin
                        ?
                            <div className="col-md-offset-5" style={{marginBottom: 20 + 'px'}} >
                                <button className="btn btn-default btn-fill btn-lg" onClick={this.createChallenge}>Create challenge</button>
                            </div>
                        :   ""
                }

                {
                    creating
                        ?
                            <ChallengeModal
                                show={this.state.showModal}
                                onHide={this.close}
                                isCreating = {creating}
                                isUserAdmin = {isUserAdmin}
                                onSave = {this.onSave}
                                takeChallenge = {this.takeChallenge}>
                                    <h4>Type</h4>
                                    <select
                                        className="form-control"
                                        defaultValue="default"
                                        onChange={this.onSelectType}
                                        ref={(c) => { this.chType = c; }}
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
                                        defaultValue="default"
                                        onChange={this.onSelectDifficulty}
                                        ref={(c) => { this.chDifficulty = c; }}
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
                                        ref={(c) => { this.chDescription = c; }}>
                                    </textarea>
                            </ChallengeModal>
                        :   ""
                }
                {Challenges}
            </div>


        );
    }
}

