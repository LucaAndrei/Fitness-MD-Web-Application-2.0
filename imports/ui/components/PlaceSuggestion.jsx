import React from 'react';

import { Link } from 'react-router';

import Geosuggest from 'react-geosuggest';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/PlaceSuggestion";

var _ = require('lodash');

let suggestion;

export default class PlaceSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getSuggestLabel = this.getSuggestLabel.bind(this);
    }

    onSuggestSelect(suggest) {
        suggestion = suggest;
        console.log(LOG_TAG,"suggest",suggest)
        console.log(LOG_TAG,"onSuggestSelect",this)
        this.props.onSuggestSelect(this.props.id,suggest);
    }

    onBlur(event) {
        console.log(LOG_TAG,"onBlur",event);
        this.props.onBlur(this.props.id, event);
    }

    getSuggestLabel() {
        console.log(LOG_TAG,"getSuggestLabel",this);
    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div className="form-group">
                <Geosuggest
                    id = {this.props.id}
                    label = {this.props.label}
                    ref = {this.props.id}
                    onSuggestSelect={this.onSuggestSelect}
                    location={new google.maps.LatLng(45.423333, 28.042500)}
                    radius="20"
                    inputClassName="form-control input-no-border"
                    style = {{
                        'input' : {
                            backgroundColor : this.props.disabled ? '' : 'white'
                        }
                    }}
                    placeholder = {this.props.placeholder}
                    onBlur = {this.onBlur}
                    disabled = {this.props.disabled}
                    ignoreTab = {true}
                    initialValue = {this.props.value ? this.props.value : ""}
                />
            </div>
        )
    }
}