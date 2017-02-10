import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

var _ = require('lodash');

let LOG_TAG = "imports/ui/pages/CompetitionList";

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;


export default class CompetitionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { editing: false, creating : false, showModal : false });
        this.createCompetition = this.createCompetition.bind(this);
    }

    createCompetition() {
        console.log(LOG_TAG,"createCompetition")
    }



    render() {
        console.log(LOG_TAG,"this.props", this.props);
        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        let counter = 1;
        let Competitions = this.props.competitions.map(function(competition){
            const date = new Date(competition.date);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            var formattedDate = (day > 9 ? day : `0${day}`) + "/" + (month > 9 ? month : `0${month}`) + "/" + date.getFullYear();
                        return  <tr
                                    key = {competition._id}
                                >
                                    <td className="text-center" >{counter++}</td>
                                    <td >{competition.origin.label}</td>
                                    <td >{competition.destination.label}</td>
                                    <td >{competition.distance} km</td>
                                    <td >{formattedDate}</td>
                                    <td className="td-actions text-right" >
                                        <div className="table-icons">
                                            <Link to = {`/app/competitions/view/${competition._id}`} className="btn btn-fill">
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                    });

        console.log(Competitions.length)

        return (
            <div className="col-md-12">
                {
                    isUserAdmin
                        ?
                            <div className="col-md-offset-5" style={{marginBottom: 20 + 'px'}} >
                                <Link to = {`/app/competitions/create`} className="btn btn-default btn-fill btn-lg">
                                    Create competition
                                </Link>

                            </div>
                        :   ""
                }
                <div className="card">
                    <div className="content">
                        <div className="bootstrap-table">

                            <div className="fixed-table-container" style = {{paddingBottom : 0 + 'px'}}>
                                <div className="fixed-table-body">
                                    <table className="table table-hover" id="bootstrap-table">
                                        <thead>
                                            <tr>
                                                <th className="text-center">
                                                    <div className="th-inner">
                                                        ID
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner">
                                                        Start point
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner">
                                                        End point
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner">
                                                        Distance
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner">
                                                        Date
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th className="td-actions text-right">
                                                    <div className="th-inner">
                                                        Actions
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Competitions.length == 0
                                                ?
                                                    <tr>
                                                        <td colSpan="6">
                                                            <p style={{padding : 40 + 'px'}} className="text-center">No competitions active</p>
                                                        </td>
                                                    </tr>
                                                : Competitions}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
}

