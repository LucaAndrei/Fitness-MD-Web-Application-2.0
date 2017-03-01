import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';

var classNames = require('classnames');


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
            nextCompetition
        } = this.props;

        console.log(LOG_TAG,"nextCompetition",nextCompetition);
        let registeredUsersForNextCompetition = 0;
        let formattedDate = "---";
        let totalAvailablePlaces = 0;
        let registeredUsersPercent = 0;
        let marathonClasses = classNames('c100', 'big', 'green', 'blue-bg');
        if (nextCompetition) {

	        registeredUsersForNextCompetition = nextCompetition.registeredUsers ? nextCompetition.registeredUsers.length : 0;

	        const date = new Date(nextCompetition.date);
	        const month = date.getMonth() + 1;
	        const day = date.getDate();
	        formattedDate = (day > 9 ? day : `0${day}`) + "/" + (month > 9 ? month : `0${month}`) + "/" + date.getFullYear();

	        totalAvailablePlaces = registeredUsersForNextCompetition + nextCompetition.availablePlaces;
	        registeredUsersPercent = (registeredUsersForNextCompetition / totalAvailablePlaces * 100).toFixed(1);

	        marathonClasses += ' ' + 'p' + Math.floor(registeredUsersPercent);
        }

        marathonClasses += ' ' + 'p' + 30; // dummy data

        let challengesClasses = classNames('c100', 'big', 'green', 'green-bg');
        let completedChallengesPercent = 80; //dummy value
        challengesClasses += ' ' + 'p' + completedChallengesPercent;


        let subscriptionsClasses = classNames('c100', 'big', 'green', 'orange-bg', 'p24');
        let subscriptionsPercent = 24; //dummy value
        subscriptionsClasses += ' ' + 'p' + subscriptionsPercent;

        return (
            <div className="row">
						<div className="col-lg-4 col-sm-6">
							<div className="card card-circle-chart" data-background="color" data-color="blue">
	                            <div className="header text-center">
	                                <h5 className="title">Upcoming Marathon - {formattedDate}</h5>
	                                <p className="description">Registered users - {registeredUsersForNextCompetition} / {totalAvailablePlaces}</p>
	                            </div>
	                            <div className="content">
	                                <div className="clearfix">
	                                    <div className="col-md-offset-3">
	                                        <div className={marathonClasses}>
	                                            <span>{registeredUsersPercent} %</span>
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
	                                        <div className={challengesClasses}>
	                                            <span>{completedChallengesPercent} %</span>
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
							<div className="card card-circle-chart" data-background="color" data-color="brown">
	                            <div className="header text-center">
	                                <h5 className="title">Subscriptions</h5>
	                                <p className="description">Newsletter</p>
	                            </div>
	                            <div className="content">
	                                <div className="clearfix">
	                                    <div className="col-md-offset-3">
	                                        <div className={subscriptionsClasses}>
	                                            <span>{subscriptionsPercent} %</span>
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
