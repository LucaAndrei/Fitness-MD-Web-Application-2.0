import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import PlaceSuggestion from '../components/PlaceSuggestion.jsx';
import CompetitionMap from '../components/CompetitionMap.jsx';

import CompetitionDetails from '../components/CompetitionDetails.jsx';


var _ = require('lodash');




let LOG_TAG = "imports/ui/pages/CompetitionForm";



export default class CompetitionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, {
            directions: null,
            waypoints : [],
            origin : {
                location : new google.maps.LatLng(45.435579, 28.0361211),
                isSet : false,
                label : ""
            },
            destination : {
                location : new google.maps.LatLng(45.435579, 28.0361211),
                isSet : false,
                label : ""
            },
            intermediatePoint : {
                location : new google.maps.LatLng(45.435579, 28.0361211),
                isSet : false,
                label : ""
            },
            places : [
                {id : "startPoint", placeholder : "Start point", label : "Start point"},
                {id : "intermediatePoint", placeholder : "---", label : "Via"},
                {id : "endPoint", placeholder : "End point", label : "End point"}
            ],
            distance : 0,
            date : new Date().toISOString(),
            isCreated : false,
            competitionId : ''
        });


        this.addPointToRoute = this.addPointToRoute.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.reconfigRoute = this.reconfigRoute.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createCompetition = this.createCompetition.bind(this);
    }

    createCompetition(date, avPlaces) {

        console.log(LOG_TAG,"createCompetition",this.state.date, this.state.distance)
        console.log(LOG_TAG,"createCompetition this",this)
        console.log(LOG_TAG,"createCompetition this.state",this.state.origin.label, this.state.destination.label)
        console.log(LOG_TAG,"start point",this.state.origin.location)
        console.log(LOG_TAG,"date",date)
        console.log("avPlaces",avPlaces)
        const origin = this.state.origin;
        const destination = this.state.destination;
        const distance = this.state.distance;
        const availablePlaces = parseInt(avPlaces);
        const errors = {};

        if (!origin.isSet) {
            errors.originSet = "Origin is not set";
        }
        if (!destination.isSet) {
            errors.destinationSet = "Destination is not set";
        }
        if (distance == 0) {
            errors.distance = "Distance cannot be 0";
        }
        if (availablePlaces == 0) {
            errors.availablePlaces = "Available places cannot be 0"
        }
        if (_.keys(errors).length) {

            _.map(_.keys(errors), function(key) {
                console.log(LOG_TAG,"key",key)
                Bert.alert(errors[key],'warning','growl-top-right')
            })
            return;
        }


        Meteor.call("insertCompetition", {
            createdBy: Meteor.userId(),
            date : date,
            origin : {
                latitude : this.state.origin.location.lat(),
                longitude : this.state.origin.location.lng(),
                label : this.state.origin.label,
            },
            destination : {
                latitude : this.state.destination.location.lat(),
                longitude : this.state.destination.location.lng(),
                label : this.state.destination.label,
            },
            hasIntermediatePoint : this.state.intermediatePoint.isSet,
            intermediate : {
                latitude : this.state.intermediatePoint.location.lat(),
                longitude : this.state.intermediatePoint.location.lng(),
                label : this.state.intermediatePoint.label,
            },
            distance: this.state.distance,
            availablePlaces : availablePlaces
        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( "Success created competition", 'success', 'growl-top-right' );
                this.props.router.push('/app/competitions/view/'+response);
                /*this.setState({
                    competitionId : response
                    isCreated : true
                })*/
            }

        });
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        console.log(LOG_TAG,"this.state",this.state)
        console.log(LOG_TAG,"nextState",nextState)
        if ((this.state.origin.isSet != nextState.origin.isSet)
            || (nextState.destination.isSet != this.state.destination.isSet)
            || (nextState.intermediatePoint.isSet != this.state.intermediatePoint.isSet)) {
            console.log(LOG_TAG,"component should update")
            return true;
        }
        return false;
    }*/

    componentDidUpdate(prevProps, prevState) {
        console.log(LOG_TAG,"prevState",prevState)
        console.log(LOG_TAG,"this.state",this.state)
        if ((prevState.origin.isSet != this.state.origin.isSet)
            || (prevState.destination.isSet != this.state.destination.isSet) || (prevState.intermediatePoint.isSet != this.state.intermediatePoint.isSet)) {
            // this.setState({
            //     date : prevState.date
            // })
            this.reconfigRoute();
        }
    }

    handleChange(value) {
        this.setState({
            date: value
        });
    }

    onBlur(inputId,event) {
        console.log(LOG_TAG,"onBlur",inputId,event);
        if (event == "") {
            if (inputId == "startPoint" && this.state.origin.isSet == true) {
                this.setState({
                    origin : {
                        location : new google.maps.LatLng(45.435579, 28.0361211),
                        isSet : false,
                        label : "",
                        distance : 0
                    },
                    directions : null
                })
            } else if (inputId == "endPoint" && this.state.destination.isSet == true) {
                this.setState({
                    destination : {
                        location : new google.maps.LatLng(45.435579, 28.0361211),
                        isSet : false,
                        label : "",
                        distance : 0
                    },
                    directions : null
                })
            } else if (inputId != "startPoint" && inputId != "endPoint"){
                if (this.state.waypoints.length > 0) {
                    this.setState({
                        intermediatePoint : {
                            location : new google.maps.LatLng(45.435579, 28.0361211),
                            isSet : false,
                            label : "",
                            distance : 0
                        },
                        waypoints : []
                    })
                }
            }
        }
    }

    onSuggestSelect(inputId,suggest) {
        this.addPointToRoute(inputId, suggest);
    }

    addPointToRoute(inputId, suggest) {
        let latitude = suggest.location.lat;
        let longitude = suggest.location.lng;
        let label = suggest.label;
        console.log(LOG_TAG,"addPointToRoute",inputId,latitude,longitude);
        if (inputId == "startPoint") {
            this.setState({
                origin : {
                    location : new google.maps.LatLng(latitude, longitude),
                    isSet : true,
                    label : label
                }
            })
        } else if (inputId == "endPoint") {
            this.setState({
                destination : {
                    location : new google.maps.LatLng(latitude, longitude),
                    isSet : true,
                    label : label
                },
            })
        } else if (inputId != "startPoint" && inputId != "endPoint" ) {

            var totalWaypoints = this.state.waypoints;
            var foundWaypoints = _.filter(totalWaypoints, function(waypoint) {
                return ((waypoint.location.lat() == latitude) && (waypoint.location.lng() == longitude));
            })
            if (foundWaypoints.length == 0) {
                totalWaypoints.push({
                    location : new google.maps.LatLng(latitude, longitude)
                })
                this.setState({
                    intermediatePoint : {
                        location : new google.maps.LatLng(latitude, longitude),
                        isSet : true,
                        label : label
                    },
                    waypoints : totalWaypoints
                })
            }
        }
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

        const isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');


        let Places = this.state.places.map(place => (
                        <PlaceSuggestion
                            key = {place.id}
                            onSuggestSelect = {this.onSuggestSelect}
                            placeholder = {place.placeholder}
                            id={place.id}
                            onBlur = {this.onBlur}
                            disabled = {!isUserAdmin || this.state.isCreated ? true : false}
                            label = {place.label}
                        />
                    ));

        return (
            <div className="container-fluid">

                    <CompetitionDetails
                        places = {Places}
                        date = {this.state.date}
                        distance = {this.state.distance}
                        isUserAdmin = {isUserAdmin}
                        createCompetition = {this.createCompetition}
                        isCreated = {this.state.isCreated}
                        handleDateChange = {this.handleChange}
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


CompetitionForm.contextTypes = {
    router: React.PropTypes.object,
};