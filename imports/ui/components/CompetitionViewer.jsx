import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';


import PlaceSuggestion from './PlaceSuggestion.jsx';
import CompetitionMap from './CompetitionMap.jsx';

import CompetitionDetails from './CompetitionDetails.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/CompetitionViewer";

var _ = require('lodash');

export default class CompetitionViewer extends React.Component {
    constructor(props) {
        super(props);
        console.log(LOG_TAG,"props",props);
        let competition = props.competition[0];
        this.state = _.assign(this.state, {
            directions: null,
            waypoints : [
                {location : new google.maps.LatLng(competition.intermediate.latitude, competition.intermediate.longitude)}
            ],
            origin : {
                location : new google.maps.LatLng(competition.origin.latitude, competition.origin.longitude),
                isSet : true,
                label : competition.origin.label
            },
            destination : {
                location : new google.maps.LatLng(competition.destination.latitude, competition.destination.longitude),
                isSet : true,
                label : competition.destination.label
            },
            intermediatePoint : {
                location : new google.maps.LatLng(competition.intermediate.latitude, competition.intermediate.longitude),
                isSet : true,
                label : competition.intermediate.label
            },
            places : [
                {id : "startPoint", placeholder : competition.origin.label, label : "Start point"},
                {id : "intermediatePoint", placeholder : competition.intermediate.label ? competition.intermediate.label : "---", label : "Via"},
                {id : "endPoint", placeholder : competition.destination.label, label : "End point"}

            ],
            distance : competition.distance,
            date : competition.date,
            isCreated : true
        });
        this.reconfigRoute = this.reconfigRoute.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.reconfigRoute();

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(LOG_TAG,"prevState",prevState)
        console.log(LOG_TAG,"this.state",this.state)

        /*if ((prevState.origin.isSet != this.state.origin.isSet)
            || (prevState.destination.isSet != this.state.destination.isSet) || (prevState.intermediatePoint.isSet != this.state.intermediatePoint.isSet)) {

            this.reconfigRoute();
        }*/
    }

    onBlur(inputId, event) {
        console.log(LOG_TAG,"onBlur",inputId)
    }

    reconfigRoute() {
        console.log(LOG_TAG,"reconfigRoute");
        if (this.state.origin.isSet == true && this.state.destination.isSet == true) {
            console.log(LOG_TAG,"create route");
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: this.state.origin.location,
                destination: this.state.destination.location,
                travelMode: google.maps.TravelMode.WALKING,
                waypoints : this.state.waypoints
            }, (result, status) => {
                console.log(LOG_TAG,"result",result);
                console.log(LOG_TAG,"status",status)
                var distance = _.reduce(result.routes[0].legs, function(sum, leg) {
                    return sum + (leg.distance.value / 1000);
                },0)
                console.log(LOG_TAG,"distance",distance)
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        distance
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render this.props: ",this.props)
        }

        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        const competition = this.props.competition[0];
        if (competition) {
            var date = new Date(competition.date);
            var timezoneOffset = date.getTimezoneOffset();
            var time = new Date(date.getTime() + Math.abs(timezoneOffset)).toISOString() ;
            console.log(LOG_TAG,"this.state.places",this.state.places)
            console.log(LOG_TAG,"competition",competition)
        } else {

        }


        let Places = this.state.places.map(place => (
                        <PlaceSuggestion
                            key = {place.id}
                            onSuggestSelect = {this.onSuggestSelect}
                            placeholder = {place.placeholder}
                            id={place.id}
                            onBlur = {this.onBlur}
                            disabled = {!isUserAdmin ? true : true}
                            value = {place.placeholder}
                            label = {place.label}

                        />
                    ));

        return (
            <div className="container-fluid">

                    <CompetitionDetails
                        places = {Places}
                        date = {time}
                        isUserAdmin = {isUserAdmin}
                        isCreated = {true}
                        competition = {competition}
                    />

                    <div className = "hidden-xs">
                        <CompetitionMap
                            directions = {this.state.directions}
                            center = {this.state.origin.location}
                        />
                    </div>


            </div>
        );
    }
}