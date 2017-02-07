import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
import ChatMessage from '../components/ChatMessage.jsx'

import sortMessages from '../../../client/modules/sort-messages';
import handleMessageInsert from '../../../client/modules/handle-message-insert';

import setScroll from '../../../client/modules/set-scroll';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/DashboardStats";

export default class DashboardStats extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render DashboardStats this.props: ",this.props)
        }

        const {
            totalUsers,
            newUsers,
        } = this.props;

        return (
            <div className="row">
                <div className="col-lg-4 col-sm-6">
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-warning text-center">
                                        <i className="ti-server"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>Users</p>
                                        {totalUsers}
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <hr />
                                <div className="stats">
                                    <i className="ti-reload"></i> Updated now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-success text-center">
                                        <i className="ti-wallet"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>Total app downloads</p>
                                        1234
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <hr />
                                <div className="stats">
                                    <i className="ti-calendar"></i> Last day
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-danger text-center">
                                        <i className="ti-pulse"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>New users</p>
                                        {newUsers}
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <hr />
                                <div className="stats">
                                    <i className="ti-timer"></i> In the last 24 hours
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}