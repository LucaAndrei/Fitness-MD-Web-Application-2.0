import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

import Chartist from 'chartist';

var _ = require('lodash');
require('chartist-plugin-legend');


let LOG_TAG = "imports/ui/pages/Challenges";

export default class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { editing: false, creating : false });
        this.onListFormSubmit = this.onListFormSubmit.bind(this);
        this.onListInputKeyUp = this.onListInputKeyUp.bind(this);
        this.onListInputBlur = this.onListInputBlur.bind(this);
        this.editList = this.editList.bind(this);
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.saveList = this.saveList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.createTodo = this.createTodo.bind(this);
            this.updateTodo = this.updateTodo.bind(this);

        this.createChallenge = this.createChallenge.bind(this);

    }

    onListFormSubmit(event) {
        event.preventDefault();
        this.saveList();
    }

    onListInputKeyUp(event) {
        if (event.keyCode === 27) {
            this.deleteChallenge();
        }
    }

    onListInputBlur() {
        if (this.state.editing) {
            this.saveList();
        }
    }

    editList() {
        this.setState({ editing: true }, () => {
            this.listNameInput.focus();
        });
    }

    deleteChallenge() {
        this.setState({ creating: false });
        const list = this.props.list;
        const message = "delete list?";

        if (confirm(message)) { // eslint-disable-line no-alert
          //remove.call({ listId: list._id }, displayError);
          //this.context.router.push('/');
        }
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

    render() {
        console.log(LOG_TAG,"Challenges this.props", this.props);
        const { editing, creating } = this.state;
        console.log("this.state",this.state)

        return (
            <div className="todo-container col-md-3">
                                <form className="list-edit-form" onSubmit={this.onListFormSubmit}>
                                    <input
                                        ref = {(c) => {this.listNameInput = c;}}
                                        className = "form-control input-no-border"
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        defaultValue="create challenge"
                                        onKeyUp={this.onListInputKeyUp}
                                        onBlur={this.onListInputBlur}
                                    />
                                    <div className="nav-group-right">
                                      <a
                                        className="nav-item"
                                        onMouseDown={this.deleteChallenge}
                                        onClick={this.deleteChallenge}
                                      >
                                        <span
                                          className="fa fa-close fa-2x"
                                        />
                                      </a>
                                    </div>
                                  </form>
                                  <form className="list-edit-form" onSubmit={this.createTodo}>
                                    <input
                                        ref = {(c) => {this.newTodoInput = c;}}
                                        className = "form-control input-no-border"
                                        placeholder="add todo"
                                    />
                                    <span className="fa fa-add" />
                                  </form>

                                    <div className="items">
                                        <input className="inputTest" id="item1" type="checkbox" checked  onChange={this.updateTodo}/>
                                        <label htmlFor="item1">Create a to-do list</label>

                                        <input className="inputTest" id="item2" type="checkbox" onChange={this.updateTodo}/>
                                        <label htmlFor="item2">Take down Christmas tree</label>

                                        <input className="inputTest" id="item3" type="checkbox" onChange={this.updateTodo}/>
                                        <label htmlFor="item3">Learn Ember.js</label>

                                        <input className="inputTest" id="item4" type="checkbox" onChange={this.updateTodo}/>
                                        <label htmlFor="item4">Binge watch every episode of MacGyver</label>

                                        <input className="inputTest" id="item5" type="checkbox" onChange={this.updateTodo}/>
                                        <label htmlFor="item5">Alphabetize everything in the fridge</label>

                                        <input className="inputTest" id="item6" type="checkbox" onChange={this.updateTodo}/>
                                        <label htmlFor="item6">Do 10 pull-ups without dropping</label>

                                        <h2 className="done" aria-hidden="true">Done</h2>
                                        <h2 className="undone" aria-hidden="true">Not Done</h2>
                                    </div>
                            </div>


        );
    }
}

