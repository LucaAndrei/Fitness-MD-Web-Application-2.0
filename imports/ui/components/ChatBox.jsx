import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
import ChatMessage from '../components/ChatMessage.jsx'

import sortMessages from '../../../client/modules/sort-messages';
import handleMessageInsert from '../../../client/modules/handle-message-insert';

import setScroll from '../../../client/modules/set-scroll';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChatBox";

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    renderMessages(messages) {
        console.log(LOG_TAG,"renderMessages", messages);
        return messages.map((message) => {
            console.log(LOG_TAG,"renderMessages message", message);
            return <ChatMessage key = {message._id} message = {message} />;
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(LOG_TAG,"handleSubmit this", this);
        var path = this.props.location.pathname;
        var toUser = path.substring(path.lastIndexOf('/') + 1)
        handleMessageInsert(this.message, toUser);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13 ) {
            return this.handleSubmit(e);
        }
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render ChatBox this.props: ",this.props)
        }

        const {
            messages,
            user,
            location
        } = this.props

        sortMessages(messages);
        setScroll('messages');

        return (
            <div className="">
                <div className="card card-chat">
                    <div className="header">
                        <h4 className="title">Chat</h4>
                        <p className="category">With Tania Andrew</p>
                    </div>
                    <div className="content">
                        <div id = "messages">
                            <ol className="chat">
                                {
                                    messages.length > 0
                                        ?
                                            this.renderMessages(messages)
                                        :
                                            <div>
                                                <p className = "alert alert-warning"> You have not said anything</p>
                                            </div>
                                }

                            </ol>
                            <hr />
                        </div>
                        <div className = "message-input">
                            <div className="send-message">
                                <div className="avatar">
                                    <img src="/img/faces/face-3.jpg" alt="crash" />
                                </div>
                                    <input
                                        id = "messageInput"
                                        className="form-control textarea"
                                        placeholder="Type here!"
                                        type="text"
                                        name = "message"
                                        ref = {(c) => {this.message = c;}}
                                        onKeyDown={this.handleKeyDown}
                                    />
                                <div className="send-button">
                                    <button className="btn btn-primary btn-fill" onClick={this.handleSubmit}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}