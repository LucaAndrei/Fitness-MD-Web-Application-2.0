import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/UserProfile";
import Charts from './Charts.jsx';


const monthNames = ["Jan","Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];

var classNames = require('classnames');

var _ = require('lodash');

// docs : http://codepen.io/maydie/pen/WvpzPG
var dayIndex = 0;
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        console.log(LOG_TAG,"props : ",props)
        this.renderUserData = this.renderUserData.bind(this);
        let x = timeRange(0);
        console.log("x",x)
        console.log("x0",x[0])
        this.state = {
            data: [],
            series: timeRange(0),
            //colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
            colors: ['#484541', '#7A9E9F', '#68B3C8', '#7AC29A', '#F3BB45', '#EB5E28'],
            disableButtonLeft : 'pointer-events',
            disableButtonRight : 'pointer-events',
            dayIndex : 0
        };

        this.clickLeft = this.clickLeft.bind(this);
        this.clickRight = this.clickRight.bind(this);
        this.clickToday = this.clickToday.bind(this);

    }

    clickLeft() {
        console.log(LOG_TAG,"clickLeft");
        var t = this.state.dayIndex;
        this.setState({
            series : timeRange(t + 1),
            dayIndex : t+1
        })
        this.populateArray(t+1);
    }

    clickRight() {
        console.log(LOG_TAG,"clickRight");
        var t = this.state.dayIndex;
        this.setState({
            series : timeRange(t - 1),
            dayIndex : t-1
        })
        this.populateArray(t-1);
    }

    clickToday() {
        console.log(LOG_TAG,"clickToday");
        this.setState({
            series : timeRange(0),
            dayIndex : 0
        })
        this.populateArray(0);
    }




    componentDidMount () {
        this.populateArray();
    }

    populateArray (indexParam) {
        let index = indexParam != undefined ? indexParam : this.state.dayIndex;
        //let index = indexParam || this.state.dayIndex;
        console.log("this.state.dayIndex",this.state.dayIndex,"indexParam",indexParam,"index",index);
            var data = [],
            serieLength = 7;
        var profile = this.renderUserData(this.props.params.userId);
        console.log("profile.pedometerData.length",profile.pedometerData.length, "past",7*index+6)

        let startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        for(var i = 7 * index + 6 ; i >=7*index  ; i--) {
            var daysAgo = startOfDay - (i*24*60*60*1000);
            console.log(LOG_TAG,i + " days ago " + new Date(daysAgo).getTime())
            var dateDaysAgo = new Date(daysAgo);

            var pedometerDataPerDay = _.sumBy(_.filter(profile.pedometerData, {'day' : dateDaysAgo.getTime()}), 'steps');
            console.log("pedometerDataPerDay",pedometerDataPerDay)
            data.push(pedometerDataPerDay);
        }


        /*for(var i = 7 * index + 6 ; i >=7*index  ; i--) {

            if(profile.pedometerData[i] != undefined) {
                console.log("profile.pedometerData["+i+"].steps : ",profile.pedometerData[i].steps)
                for (let t = 0 ; t <= 7 ; t++) {

                }
                data.push(profile.pedometerData[i].steps);
            } else {
                data.push(0);
            }

        }*/


        // for (var j = serieLength; j--; ) {
        //     data.push(getRandomInt(0, 10000));
        // }

        console.log(LOG_TAG,"populateArray",data)
        this.setState({ data: data });
    }
    renderUserData(userId) {
        let users = this.props.users;
        var userProfile = users.filter(function(user, pos) {
            return user._id == userId;
        })
        return userProfile[0]
    }
    render () {
        if (DEBUG) {
            console.log(LOG_TAG, "render UserProfile this.props",this.props);
        }
        var profile = this.renderUserData(this.props.params.userId);
        console.log(LOG_TAG,"profile : ",profile);
        console.log(LOG_TAG,"this.state",this.state)
        var dateNow = new Date();
        var date = dateNow.getDate()+"-"+monthNames[dateNow.getMonth()]+"-"+dateNow.getFullYear()%100;

        let stepsClasses = classNames('c100', 'big', 'green', 'blue-bg');

        let startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        console.log("profile.pedometerData",profile.pedometerData[1].day)
        console.log("startOfDay",startOfDay)
        let stepsForToday = _.sumBy(_.filter(profile.pedometerData, {'day' : startOfDay.getTime()}), 'steps');
        console.log("stepsForToday",stepsForToday);
        /*
            10.000 steps ..... 100%
            4276 steps ........x %
            x = 4276 *100/ 10.000
            x = 4276 / 100 = 42.76


        */

        // dummy just for testing
        let stepsPercent = (stepsForToday / 100).toFixed(1); //dummy value


        stepsClasses += ' ' + 'p' +  Math.floor(stepsPercent);


        var dateNow = new Date();
        var date = dateNow.getDate()+"-"+monthNames[dateNow.getMonth()]+"-"+dateNow.getFullYear()%100;

        let buttonLeftClasses = classNames('btn','btn-default','btn-fill','btn-move-left');

        let buttonRightClasses = classNames('btn','btn-default','btn-move-right', this.state.dayIndex == 0 ? 'pointer-events' : 'btn-fill');
        let weight = profile.profile.weight == undefined ? '55.5' : profile.profile.weight;
        let totalSteps = _.sumBy(profile.pedometerData, function(data) {
            return data.steps;
        })
        let timeActive = _.sumBy(profile.pedometerData, function(data) {
            return data.timeActive;
        })


        return (
            <div className="content-scrollable container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-user">
                            <div className="image">
                                </div>
                            <div className="content">
                                <div className="author">
                                  <img className="avatar border-white" src={"data:image/png;base64," + profile.profilePictureBase64} alt="..." />
                                  <h4 className="title">{profile.username}<br/>
                                    <Link to = {`/app/chat/${profile._id}`}>
                                        <small>{profile.emails[0].address}</small>
                                    </Link>
                                    </h4>
                                </div>
                            </div>


                            <hr />
                            <div className="text-center">
                                <div className="row">
                                    <div className="col-md-3 col-md-offset-1">
                                        <h5>{totalSteps}<br /><small>Steps</small></h5>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>{weight}<br /><small>Kg</small></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>{timeActive}<br /><small>Time active</small></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-circle-chart" data-background="color" data-color="blue">
                            <div className="header">
                                <h5 className="title">Steps today</h5>
                                <p className="description">{stepsForToday} / 10.000</p>
                            </div>
                            <div className="content">
                                <div className="clearfix">
                                    <div className="col-md-4 col-md-offset-1 col-lg-offset-4 col-sm-offset-4">
                                        <div className={stepsClasses}>
                                            <span>{stepsForToday}</span>
                                            <div className="slice">
                                                <div className="bar"></div>
                                                <div className="fill"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="user-graph-footer-arc-progress">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Countries of provenance</h4>
                                <p className="category">&nbsp;</p>
                            </div>
                            <div className="content">
                                <Charts
                                    data={ this.state.data }
                                    labels={ this.state.series }
                                    colors={ this.state.colors }
                                    height={ 250 }
                                />

                            </div>
                            <div className="user-graph-footer hidden-xs col-md-offset-4 col-sm-offset-4">
                                <button type="button" className={buttonLeftClasses} onClick={this.clickLeft}>
                                    <span className="btn-label">
                                        <i className="ti-angle-left"></i>
                                    </span>
                                    Back
                                </button>
                                <button className="btn btn-default btn-fill" onClick={this.clickToday}>{date}</button>
                                <button type="button" className={buttonRightClasses} onClick={this.clickRight}>
                                    Next
                                    <span className="btn-label">
                                        <i className="ti-angle-right"></i>
                                    </span>
                                </button>
                            </div>


                            <div className="hidden-lg hidden-md hidden-sm user-graph-footer-xs">
                                <button type="button" className={buttonLeftClasses} onClick={this.clickLeft}>
                                    <span className="btn-label">
                                        <i className="ti-angle-left"></i>
                                    </span>
                                    Back
                                </button>
                                <button className="btn btn-sm btn-default btn-fill"  onClick={this.clickToday}>{date}</button>
                                <button type="button" className={buttonRightClasses} onClick={this.clickRight}>
                                    Next
                                    <span className="btn-label">
                                        <i className="ti-angle-right"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );



    }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function xDaysAgo(dateNow, xDays) {
    if (DEBUG) {
        console.log(LOG_TAG,"xDaysAgo date : ", dateNow, " >>> xDays : ", xDays);
    }

    var parsedData = d3.time.format("%d-%b-%y").parse(dateNow);
    var date = new Date(parsedData);
    var daysAgo = date - (xDays*24*60*60*1000);
    var dateDaysAgo = new Date(daysAgo);
    var yr = dateDaysAgo.getFullYear() % 100;
    var formattedDaysAgo = dateDaysAgo.getDate()+"-"+monthNames[dateDaysAgo.getMonth()]+"-"+yr;
    if (DEBUG) {
        //console.log(LOG_TAG,"formattedDaysAgo : ", formattedDaysAgo);
    }
    return formattedDaysAgo;
}


function xDaysFuture(dateNow, xDays) {
    if (DEBUG) {
        console.log(LOG_TAG,"xDaysFuture date : ", dateNow, " >>> xDays : ", xDays);
    }

    var parsedData = d3.time.format("%d-%b-%y").parse(dateNow);
    var date = new Date(parsedData);
    var daysFuture = date.getTime() + (xDays*24*60*60*1000);
    var dateDaysFuture = new Date(daysFuture);
    var yr = dateDaysFuture.getFullYear() % 100;
    var formattedDaysFuture = dateDaysFuture.getDate()+"-"+monthNames[dateDaysFuture.getMonth()]+"-"+yr;

    if (DEBUG) {
        //console.log(LOG_TAG,"formattedDaysFuture : ", formattedDaysFuture);
    }
    return formattedDaysFuture;
}


function timeRange(index) {
    var date = new Date();
    var timeRange = [];
    if (DEBUG) {
        console.log(LOG_TAG,"beforeNow date : ", date);
    }
    console.log("index",index,"7*index+6",7*index+6)
    for(var i = 7 * index + 6 ; i >=7*index  ; i--) {
        var daysAgo = date - (i*24*60*60*1000);
        console.log(LOG_TAG,i + " days ago " + new Date(daysAgo).getTime())
        var dateDaysAgo = new Date(daysAgo);
        var yr = dateDaysAgo.getFullYear() % 100;
        var formattedBeforeNow = dateDaysAgo.getDate()+"-"+monthNames[dateDaysAgo.getMonth()]+"-"+yr;
        timeRange.push(formattedBeforeNow);
        if (DEBUG) {
            //console.log(LOG_TAG,"formattedBeforeNow : ", formattedBeforeNow);
        }
    }
    console.log("timeRange",timeRange)
    return timeRange;
}