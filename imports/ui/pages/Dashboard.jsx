import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';



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
            users
        } = this.props;


        var start = new Date();
        start.setHours(0,0,0,0);
        console.log("start",start.getTime());

        var totalStepsForHourIndex = [0,0,0,0,0,0,0,0,0];
        var times = _.countBy(users, function(user) {
            console.log("user",user)
            _.countBy(user.pedometerData, function(data) {
                console.log("data",data.day);
                if (data.day == start.getTime()) {
                    console.log("data.steps",data.steps)
                    totalStepsForHourIndex[data.hourIndex] += data.steps;
                }
            })
        })

        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [totalStepsForHourIndex,totalStepsForHourIndex,totalStepsForHourIndex]
        };

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 1000,
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

        var newUsers = _.values(_.countBy(users, function(user) {
            var date = new Date(user.createdAt);
            var dateNow = new Date();
            var diff = (dateNow-date)/(3600*1000);
            return (
                (!Roles.userIsInRole(user._id, 'admin') && user._id != Meteor.userId())
                && diff <= 24);
        }))[0];



        var usersPerCountry = _.countBy(users,function(user) {
            console.log("user.profile.name",user._id)
            console.log("user.profile.country",user.profile.country);
            return user.profile.country;

        })

        console.log("usersPerCountry",usersPerCountry)

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





        return (
            <div className="container-fluid">
                <DashboardStats newUsers = {newUsers} totalUsers = {totalUsers}/>

                <DashboardCompletedTasks />
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

