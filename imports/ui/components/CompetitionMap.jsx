import React from 'react';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/CompetitionMap";

import { GoogleMap, DirectionsRenderer, } from "react-google-maps";

import { withGoogleMap } from "react-google-maps";

export default class CompetitionMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render this.props: ",this.props)
        }

        const GettingStartedGoogleMap = withGoogleMap(props => (
            <GoogleMap
                defaultZoom={13}
                defaultCenter={this.props.center}
            >
                {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}
            </GoogleMap>
        ));

        return (
            <GettingStartedGoogleMap
                containerElement={
                    <div style={{
                        position: 'absolute',
                        top: 105 + 'px',
                        right: 0,
                        bottom: 0,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height : 480 + 'px',
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
                center={this.props.origin}
                directions={this.props.directions}
            />
        )
    }
}