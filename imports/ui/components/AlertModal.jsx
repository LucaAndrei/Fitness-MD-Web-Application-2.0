import React from 'react';

import { Link } from 'react-router';

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var OverlayMixin = ReactBootstrap.OverlayMixin;

let DEBUG = true;
let LOG_TAG = "imports/ui/components/AlertModal";

export default class AlertModal extends React.Component {
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
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide} className="btn btn-fill btn-wd">Cancel</button>
                    <button onClick={this.props.onConfirm} className="btn btn-fill btn-wd">{this.props.confirmText}</button>
                </Modal.Footer>
            </Modal>
        )
    }
}