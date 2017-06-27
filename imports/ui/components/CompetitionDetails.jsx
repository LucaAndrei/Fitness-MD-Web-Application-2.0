import React from 'react';

import { Link } from 'react-router';

import Geosuggest from 'react-geosuggest';
import AlertModal from './AlertModal.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/CompetitionDetails";

var _ = require('lodash');


var DatePicker = require('react-bootstrap-date-picker');

let suggestion;

export default class CompetitionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { showModal: false});
        this.deleteCompetition = this.deleteCompetition.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.close = this.close.bind(this);

        this.createCompetition = this.createCompetition.bind(this);
        this.registerCompetition = this.registerCompetition.bind(this);
    }

    deleteCompetition() {
        console.log(LOG_TAG,"deleteCompetition",this.props.competition._id);

        this.setState({ showModal: true});
    }

    cancelDelete() {
        console.log(LOG_TAG,"cancelDelete");
        this.setState({ showModal: false});
    }



    onConfirm() {
        console.log(LOG_TAG,"onConfirm")
        Meteor.call("deleteCompetition", {
            competitionId: this.props.competition._id
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success' , 'growl-top-right' );
                this.context.router.push("/app/competitions");
            }

        });
    }


    close() {
        this.setState({ showModal: false});
    }

    registerCompetition(event) {
        console.log(LOG_TAG,"registerCompetition",this.props)
        let isRegistering = event.target.value == "give_up" ? false : true;
        Meteor.call("registerCompetition", {
            userID : Meteor.userId(),
            competitionId: this.props.competition._id,
            registering : isRegistering
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( response, 'success' , 'growl-top-right' );
            }

        });
    }

    createCompetition() {
        console.log(LOG_TAG,"createCompetition",this)
        console.log(LOG_TAG,"date ",this.date.getValue(),this.date.getFormattedValue())
        console.log(LOG_TAG,"distance",this.distance.value)
        console.log(LOG_TAG,"point",this.props.places[0])

        this.props.createCompetition(this.date.getValue(), this.availablePlaces.value);

    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }

        const {
            isUserAdmin,
            date,
            competition
        } = this.props;

        var xDate = new Date(date);
        console.log(LOG_TAG,"xDate",xDate);
        console.log(LOG_TAG,"year",xDate.getFullYear(),"month",xDate.getMonth(),"day",xDate.getDate())

        let isRegistered = false;
        let availablePlacesProps, distanceProps;
        let availablePlaces = 0;
        if (competition) {
            console.log(LOG_TAG,"competition",competition)
            if (competition.hasOwnProperty('registeredUsers')) {
                console.log(LOG_TAG,"competition.registeredUsers", competition.registeredUsers)
                let found = false;
                competition.registeredUsers.map(function(user) {
                    console.log(LOG_TAG,"user",user);
                    if (user == Meteor.userId()) {
                        console.log(LOG_TAG,"found !!!!");
                        found = true;
                    }
                })

                console.log(LOG_TAG,"found",found);

                isRegistered = found;
            }
            availablePlaces = competition.availablePlaces;
            availablePlacesProps = {
                value : competition.availablePlaces
            }
            distanceProps = {
                value : competition.distance + ' km'
            }

        } else {

            distanceProps = {
                value : this.props.distance + ' km'
            }
        }


        console.log(LOG_TAG,"isRegistered",isRegistered)
        console.log(LOG_TAG,"availablePlaces",availablePlaces)




        return (
            <div className = "col-md-6">
                <div className="card" data-background="color" data-color="blue">
                    <div className="content">
                        <div className="row">
                            <div className="col-xs-5"><h3 className="title">Route</h3></div>
                            <div className="col-xs-7">
                                <div className="form-group pull-right">
                                    <label>Date</label>
                                    <DatePicker
                                        dateFormat="DD/MM/YYYY"
                                        onChange={this.props.handleDateChange}
                                        value={this.props.date}
                                        calendarPlacement="bottom"
                                        className="input-bg-white"
                                        disabled = {!this.props.isUserAdmin || this.props.isCreated ? true : false}
                                        ref = {(c) => {this.date = c;}}
                                    />
                                </div>
                            </div>
                        </div>

                        {this.props.places}

                        <div className="form-group">
                            <label>Available places</label>
                            <input
                                id = "availablePlaces"
                                className="form-control input-bg-white input-no-border"
                                type="number"
                                name="availablePlaces"
                                ref = {(c) => {this.availablePlaces = c;}}
                                disabled = {!this.props.isUserAdmin || this.props.isCreated ? true : false}
                                {...availablePlacesProps}
                                min="1" />
                        </div>

                        <div className="form-group">
                            <label>Distance</label>
                            <input
                                id = "distance"
                                className="form-control input-bg-white input-no-border"
                                placeholder="0 km"
                                type="text"
                                name = "distance"
                                disabled
                                ref = {(c) => {this.distance = c;}}
                                {...distanceProps}
                            />
                        </div>
                        {
                            !this.props.isCreated
                                ? <button type="submit" className="btn btn-fill btn-wd" onClick={this.createCompetition}>Create competition</button>
                                : ""
                        }

                        <Link to = {`/app/competitions`} className="btn btn-fill btn-wd">
                            {!this.props.isCreated ? "Cancel" : "Back"}
                        </Link>
                        {
                            isUserAdmin
                                ?
                                    (
                                        this.props.isCreated
                                            ?
                                                <button type="submit" className="btn btn-fill btn-challenge" onClick={this.deleteCompetition}>Delete</button>
                                            :
                                                ""
                                    )
                                :
                                    (
                                        isRegistered
                                            ?   <button type="submit" className="btn btn-fill" onClick={this.registerCompetition} value="give_up">Unregister</button>
                                            :
                                                (
                                                    availablePlaces > 0
                                                        ?   <button type="submit" className="btn btn-fill" onClick={this.registerCompetition} value="take_it">Register</button>
                                                        :    ""
                                                )

                                    )

                        }
                    </div>
                </div>
                {
                    this.state.showModal
                        ?
                            <AlertModal
                                onHide={this.close}
                                show={this.state.showModal}
                                onConfirm={this.onConfirm}
                                body="Are you sure you want to delete this?"
                                confirmText="Confirm Delete"
                                title="Delete competition?">
                                <button>Delete Stuff</button>
                            </AlertModal>
                        :""
                }
            </div>
        )
    }
}

CompetitionDetails.contextTypes = {
    router: React.PropTypes.object,
};