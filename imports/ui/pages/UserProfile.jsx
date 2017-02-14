import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/UserProfile";
import Charts from './Charts.jsx';


const monthNames = ["Jan","Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];


// docs : http://codepen.io/maydie/pen/WvpzPG
import { Circle } from 'rc-progress';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        console.log(LOG_TAG,"props : ",props)
        this.renderUserData = this.renderUserData.bind(this);
        this.state = {
            data: [],
            series: ['20-Jan-17','21-Jan-17','22-Jan-17','23-Jan-17','24-Jan-17','25-Jan-17','26-Jan-17'],
            colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
        };

    }
    componentDidMount () {
        this.populateArray();
    }
    populateArray () {
        var data = [],
            serieLength = 7;
        for (var j = serieLength; j--; ) {
            data.push(getRandomInt(0, 10000));
        }
        console.log(LOG_TAG,"populateData",data)
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
                                        <h5>137453<br /><small>Steps</small></h5>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>55.7<br /><small>Kg</small></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>13:24:33<br /><small>Time active</small></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Circle progress</h4>
                                <p className="category">30 %</p>
                            </div>
                            <div className="content">

                                <div className="clearfix">
                                    <div className="col-md-4 col-md-offset-4">
                                        <div className="c100 p50 big green">
                                            <span className="modified">10000 steps</span>
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
                            <div className="user-graph-footer hidden-xs col-md-offset-4">
                                <button type="button" className="btn btn-default btn-fill btn-move-left">
                                    <span className="btn-label">
                                        <i className="ti-angle-left"></i>
                                    </span>
                                    Back
                                </button>
                                <button className="btn btn-default btn-fill">06-Feb-16</button>
                                <button type="button" className="btn btn-default btn-fill btn-move-right">
                                    Next
                                    <span className="btn-label">
                                        <i className="ti-angle-right"></i>
                                    </span>
                                </button>
                            </div>

                            <div className="hidden-lg user-graph-footer-xs">
                                <button type="button" className="btn btn-sm btn-default btn-fill btn-move-left">
                                    <span className="btn-label">
                                        <i className="ti-angle-left"></i>
                                    </span>
                                    Back
                                </button>
                                <button className="btn btn-sm btn-default btn-fill">06-Feb-16</button>
                                <button type="button" className="btn btn-sm btn-default btn-fill btn-move-right">
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