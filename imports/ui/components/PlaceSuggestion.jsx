import React from 'react';

import { Link } from 'react-router';

import Geosuggest from 'react-geosuggest';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/PlaceSuggestion";

var _ = require('lodash');

export default class PlaceSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onSuggestSelect(suggest) {
        console.log(LOG_TAG,"suggest",suggest)
        console.log(LOG_TAG,"onSuggestSelect",this)
        this.props.onSuggestSelect(this.props.id,suggest);
    }

    onBlur(event) {
        console.log(LOG_TAG,"onBlur",event);
        this.props.onBlur(this.props.id, event);
    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div className="col-md-12 col-xs-12">
                <div className="col-md-10">
                    <Geosuggest
                        ref = {this.props.id}
                        onSuggestSelect={this.onSuggestSelect}
                        location={new google.maps.LatLng(45.423333, 28.042500)}
                        radius="20"
                        inputClassName="form-control input-no-border"
                        style = {{
                            'input' : {
                                backgroundColor : 'white'
                            }
                        }}
                        placeholder = {this.props.placeholder}
                        onBlur = {this.onBlur}
                    />
                </div>
                <div className="col-md-2"><i className="fa-delete-waypoint fa fa-close fa-2x" onClick={this.props.deleteWaypoint}></i></div>
            </div>
        )
    }
}