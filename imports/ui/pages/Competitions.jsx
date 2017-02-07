import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';
import PlaceSuggestion from '../components/PlaceSuggestion.jsx';

import {
GoogleMap,
DirectionsRenderer,
} from "react-google-maps";

import { withGoogleMap } from "react-google-maps";


var _ = require('lodash');


let LOG_TAG = "imports/ui/pages/Competitions";



export default class Competitions extends React.Component {
    constructor(props) {
        super(props);
        // var waypts = [];
        // waypts.push({
        //     location : new google.maps.LatLng(45.423333, 28.042500),stopover: false

        // })
        this.state = _.assign(this.state, {
            origin: new google.maps.LatLng(45.423333, 28.042500),
            destination: new google.maps.LatLng(45.423333, 28.042500),
            directions: null,
            waypoints : [],
            originSet : false,
            destinationSet : false
        });


        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.deleteWaypoint = this.deleteWaypoint.bind(this);
        this.addPoint = this.addPoint.bind(this);
        this.addPointToRoute = this.addPointToRoute.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
    }

    componentDidMount() {
        console.log(LOG_TAG,"componentDidMount")
        if (this.state.origin == null && this.state.destination == null) {
            this._mapComponent = null;
        }
        // const DirectionsService = new google.maps.DirectionsService();


        // DirectionsService.route({
        //     origin: this.state.origin,
        //     destination: this.state.destination,
        //     travelMode: google.maps.TravelMode.WALKING,
        //     waypoints : this.state.waypoints
        // }, (result, status) => {
        //     console.log("result",result);
        //     console.log("status",status)
        //     if (status === google.maps.DirectionsStatus.OK) {
        //         this.setState({
        //             directions: result,
        //         });
        //     } else {
        //         console.error(`error fetching directions ${result}`);
        //     }
        // });
    }

    onBlur(inputId,event) {
        console.log(LOG_TAG,"onBlur",inputId,event);
        if (event == "") {
            if (inputId == "startPoint") {
                this.setState({
                    origin :  new google.maps.LatLng(45.423333, 28.042500),
                    originSet : false
                })
            } else if (inputId == "endPoint") {
                this.setState({
                    destination : new google.maps.LatLng(45.423333, 28.042500),
                    destinationSet : false
                })
            }
        }
    }

    onFocus(event) {
        console.log(LOG_TAG,"onFocus",event)
    }

    onSuggestSelect(inputId,suggest) {
        console.log(LOG_TAG,"inputId",inputId);
        console.log(LOG_TAG,"suggest",suggest);
        this.addPointToRoute(inputId, suggest.location.lat, suggest.location.lng);
    }

    addPointToRoute(inputId, latitude, longitude) {
        console.log("addPointToRoute",inputId,latitude,longitude);

        if (inputId == "startPoint") {
            this.setState({
                origin : new google.maps.LatLng(latitude, longitude),
                originSet : true
            })
        } else if (inputId == "endPoint") {
            this.setState({
                destination : new google.maps.LatLng(latitude, longitude),
                destinationSet : true
            })
        } else {

        }
        if (this.state.originSet == true && this.state.destinationSet == true) {
            console.log("create route");
        }



        // var waypts = this.state.waypoints;
        // waypts.push({location : new google.maps.LatLng(latitude, longitude)})

        // const DirectionsService = new google.maps.DirectionsService();

        // DirectionsService.route({
        //     origin: this.state.origin,
        //     destination: this.state.destination,
        //     travelMode: google.maps.TravelMode.WALKING,
        //     waypoints : this.state.waypoints
        // }, (result, status) => {
        //     console.log("result",result);
        //     console.log("status",status)
        //     if (status === google.maps.DirectionsStatus.OK) {
        //         this.setState({
        //             directions: result,
        //         });
        //     } else {
        //         console.error(`error fetching directions ${result}`);
        //     }
        // });
    }

    handleMapLoad(map) {
        this._mapComponent = map;
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        console.log("event",event);

        this.addPointToRoute("", event.latLng.lat(), event.latLng.lng());


    }

    deleteWaypoint() {
        console.log("deleteWaypoint",this)
    }

    addPoint() {
        console.log("addPoint");
    }



    render() {

        const GettingStartedGoogleMap = withGoogleMap(props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={7}
                defaultCenter={props.center}
                onClick={props.onMapClick}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        ));

        return (
            <div className="myDiv">
                <div className = "col-md-6">
                    <PlaceSuggestion
                        deleteWaypoint = {this.deleteWaypoint}
                        onSuggestSelect = {this.onSuggestSelect}
                        placeholder = "Start point"
                        id="startPoint"
                        onBlur = {this.onBlur}
                    />
                    <PlaceSuggestion
                        deleteWaypoint = {this.deleteWaypoint}
                        onSuggestSelect = {this.onSuggestSelect}
                        placeholder = "End point"
                        id="endPoint"
                        onBlur = {this.onBlur}
                    />
                    <p>Add point <i className="fa fa-plus fa-2x" onClick={this.addPoint}></i></p>
                </div>


                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{
                            position: 'absolute',
                            top: 100 + 'px',
                            right: 0,
                            bottom: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height : 310 + 'px',
                            width : 50 + '%'}} />
                    }
                    mapElement={
                        <div style={{    position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                       }} />
                    }
                    center={this.state.origin}
                    directions={this.state.directions}
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                />
            </div>
        );
    }
}

