import React from 'react';

import { Link } from 'react-router';

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var OverlayMixin = ReactBootstrap.OverlayMixin;

let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChallengeModal";

export default class ChallengeModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        const {isCreating, title, isUserAdmin} = this.props;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Create challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        isCreating
                            ?
                                <button onClick={this.props.onSave} className="btn btn-fill btn-wd">Save</button>
                            :   ""
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}