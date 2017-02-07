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
        this.editList = this.editList.bind(this);
        this.saveList = this.saveList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.focusTodoInput = this.focusTodoInput.bind(this);
            this.updateTodo = this.updateTodo.bind(this);

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

    editList() {
        this.setState({ editing: true }, () => {
            this.listNameInput.focus();
        });
    }

    saveList() {
        this.setState({ editing: false });
        console.log("savelist")
    }

    deleteList() {
        console.log("deleteList")
    }

    createTodo(event) {
        event.preventDefault();
        const input = this.newTodoInput;
        console.log("createTodo",input)
    }

    focusTodoInput() {
        this.newTodoInput.focus();
    }

  updateTodo(event) {
    this.throttledUpdate(event.target.value);
  }

  createChallenge() {
    console.log("createChallenge");
    this.setState({ creating: true, showModal : true });
  }


  close() {
    this.setState({ showModal: false, creating: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  openModal() {
    console.log("openModal",this);
  }


  onSelectType(event) {
    console.log("onSelectType",event.target.value);
  }

  onSelectDifficulty(event) {
    console.log("onSelectDifficulty",event.target.value);
  }

  onChangeDescription(event) {
    console.log("onChangeDescription",event.target.value);
  }


  onSave() {
    console.log("onSave",this);
    console.log("chType",this.chType.value)
    console.log("chDifficulty",this.chDifficulty.value)
    console.log("chDescription",this.chDescription.value)
    let self = this;
    Meteor.call("insertChallenge", {
            createdBy: Meteor.userId(),
            difficulty : this.chDifficulty.value,
            type : this.chType.value,
            text : this.chDescription.value
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, "Inserted challenge!" );
                this.close();
            }

        });
  }


  takeChallenge() {
    console.log("takeChallenge",this);
    console.log("chType",this.chType.value)
    console.log("chDifficulty",this.chDifficulty.value)
    console.log("chDescription",this.chDescription.value)
  }





    render() {
        console.log(LOG_TAG,"Challenges this.props", this.props);
        const { challenges } = this.props;
        const { editing, creating } = this.state;
        console.log("this.state",this.state)


        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        console.log("isUserAdmin",isUserAdmin);


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

