import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import DashboardStats from '../components/DashboardStats.jsx';
import DashboardGraphs from '../components/DashboardGraphs.jsx';
import DashboardCompletedTasks from '../components/DashboardCompletedTasks.jsx';


import Chartist from 'chartist';

var _ = require('lodash');
require('chartist-plugin-legend');


let LOG_TAG = "imports/ui/pages/Dashboard";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(LOG_TAG,"Dashboard this.props", this.props);
        const {
            users,
            competitions,
            downloads
        } = this.props;


        var start = new Date();
        start.setHours(0,0,0,0);
        console.log(LOG_TAG,"start",start.getTime());

        var totalStepsForHourIndex = [0,0,0,0,0,0,0,0,0]; //extra 0 because the 06:00 am hour is displayed outside the graph
        let numberOfUsersForGraph = [];
        var times = _.countBy(users, function(user) {
            console.log(LOG_TAG,"user",user)
            _.countBy(user.pedometerData, function(data) {
                //console.log(LOG_TAG,"data",data.day,"startOfDay",start.getTime());
                if (data.day == start.getTime()) {
                    if(numberOfUsersForGraph.indexOf(user._id) == -1) {
                        numberOfUsersForGraph.push(user._id);
                    }
                    console.log(LOG_TAG,"data.steps",data.steps,"hourIndex",data.hourIndex)
                    totalStepsForHourIndex[data.hourIndex] += data.steps;
                }
            })
        })
        console.log("numberOfUsersForGraph",numberOfUsersForGraph.length)
        for(let i = 0; i < totalStepsForHourIndex.length;i++) {
            console.log("totalStepsForHourIndex["+i+"] : ",totalStepsForHourIndex[i]);
            totalStepsForHourIndex[i] /= numberOfUsersForGraph.length;
            console.log("average totalStepsForHourIndex["+i+"] : ",totalStepsForHourIndex[i]);
        }

        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [totalStepsForHourIndex,totalStepsForHourIndex,totalStepsForHourIndex]
        };
        for(let i = 0; i < totalStepsForHourIndex.length;i++) {
            console.log("totalStepsForHourIndex["+i+"] : ",totalStepsForHourIndex[i]);
        }
        console.log("totalStepsForHourIndex",totalStepsForHourIndex,"min",_.min(totalStepsForHourIndex),"max",_.max(totalStepsForHourIndex))
        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: _.max(totalStepsForHourIndex),
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
          fullWidth : true
        };
        var type = 'Line';

        var typePie = 'Pie';

        var totalUsers = _.values(_.countBy(users, function(user) {
            return  (!Roles.userIsInRole(user._id, 'admin') && user._id != Meteor.userId());
        }))[0];

        var newUsersCounter = 0;
        var newUsers = _.values(_.countBy(users, function(user) {
            var date = new Date(user.createdAt);
            var dateNow = new Date();
            var diff = (dateNow-date)/(3600*1000);
            var isUserNew = (!Roles.userIsInRole(user._id, 'admin') && user._id != Meteor.userId()) && diff <= 24;
            if (isUserNew) newUsersCounter++;


        }));


        var usersPerCountry = _.countBy(users,function(user) {
            console.log(LOG_TAG,"user.profile.name",user._id)
            console.log(LOG_TAG,"user.profile.country",user.profile.country);
            return user.profile.country;

        })

        console.log(LOG_TAG,"usersPerCountry",usersPerCountry)

        var lbl = [];
        var srs = [];
        _.forEach(usersPerCountry, function(country) {
            var val = (country * 100) / totalUsers;
            srs.push(_.round(val,1));
            lbl.push(val.toFixed(1) + "%");
        })
        var countries = _.keys(usersPerCountry);
        var dataPie = {
            labels: lbl,
            series: srs
        };

        var optionsPie = {
            startAngle: 0,
            total: 100,
            showLabel: true,
            plugins: [
                Chartist.plugins.legend({
                    legendNames : countries
                })
            ]
        };

        var nextCompetitions = [];
        _.map(_.sortBy(competitions, function(competition) {
            return new Date(competition.date);
        }), function(sortedCompetition) {
            console.log(LOG_TAG,"sortedCompetition",sortedCompetition);
            var dateNow = new Date();
            var competitionDate = new Date(sortedCompetition.date);
            if (dateNow < competitionDate) {
                console.log(LOG_TAG,"competition in future")
                nextCompetitions.push(sortedCompetition);
                return;
            } else {
                console.log(LOG_TAG,"competition in past");
            }
        })

        console.log(LOG_TAG,"nextCompetitions",nextCompetitions)




        return (
            <div className="container-fluid">
                <DashboardStats newUsers = {newUsersCounter} totalUsers = {totalUsers} numberOfDownloads = {downloads[0].count} />

                <DashboardCompletedTasks
                    nextCompetition = {nextCompetitions[0]}
                    />
                <DashboardGraphs
                    usersBehaviorData = {dataSales}
                    usersBehaviorOptions = {optionsSales}
                    usersBehaviorType  = {type}
                    usersByCountryData = {dataPie}
                    usersByCountryOptions = {optionsPie}
                    usersByCountryType = {typePie}
                    countries = {countries}
                />
            </div>


        );
    }
}

