import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
import ChatMessage from '../components/ChatMessage.jsx'

import sortMessages from '../../../client/modules/sort-messages';
import handleMessageInsert from '../../../client/modules/handle-message-insert';

import setScroll from '../../../client/modules/set-scroll';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/DashboardCompletedTasks";

export default class DashboardCompletedTasks extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render DashboardCompletedTasks this.props: ",this.props)
        }

        const {
            totalUsers,
            newUsers,
        } = this.props;

        return (
            <div className="row">
						<div className="col-lg-4 col-sm-6">
							<div className="card card-circle-chart" data-background="color" data-color="blue">
	                            <div className="header text-center">
	                                <h5 className="title">Marathon</h5>
	                                <p className="description">Registered</p>
	                            </div>
	                            <div className="content">
	                                <div className="clearfix">
	                                    <div className="col-md-offset-3">
	                                        <div className="c100 p65 big green">
	                                            <span>65 %</span>
	                                            <div className="slice">
	                                                <div className="bar"></div>
	                                                <div className="fill"></div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
						</div>
						<div className="col-lg-4 col-sm-6">
							<div className="card card-circle-chart" data-background="color" data-color="green">
	                            <div className="header text-center">
	                                <h5 className="title">Challenges</h5>
	                                <p className="description">Completed</p>
	                            </div>
	                            <div className="content">
	                                <div className="clearfix">
	                                    <div className="col-md-offset-3">
	                                        <div className="c100 p44 big green">
	                                            <span>44 %</span>
	                                            <div className="slice">
	                                                <div className="bar"></div>
	                                                <div className="fill"></div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
						</div>
						<div className="col-lg-4 col-sm-6">
							<div className="card card-circle-chart" data-background="color" data-color="orange">
	                            <div className="header text-center">
	                                <h5 className="title">Subscriptions</h5>
	                                <p className="description">Newsletter</p>
	                            </div>
	                            <div className="content">
	                                <div className="clearfix">
	                                    <div className="col-md-offset-3">
	                                        <div className="c100 p17 big green">
	                                            <span>17 %</span>
	                                            <div className="slice">
	                                                <div className="bar"></div>
	                                                <div className="fill"></div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
						</div>
					</div>
        )
    }
}
