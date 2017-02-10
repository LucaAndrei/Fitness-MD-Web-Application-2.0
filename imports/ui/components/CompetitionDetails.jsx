import React from 'react';

import { Link } from 'react-router';

import Geosuggest from 'react-geosuggest';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/CompetitionDetails";

var _ = require('lodash');


var DatePicker = require('react-bootstrap-date-picker');

let suggestion;

export default class CompetitionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.createCompetition = this.createCompetition.bind(this);
    }

    createCompetition() {
        console.log(LOG_TAG,"createCompetition",this)
        console.log(LOG_TAG,"date ",this.date.getValue(),this.date.getFormattedValue())
        console.log(LOG_TAG,"distance",this.distance.value)
        console.log(LOG_TAG,"point",this.props.places[0])

        this.props.createCompetition(this.date.getValue());

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
        var date = this.props.date;
        var xDate = new Date(date);
        console.log("xDate",xDate);
        console.log("year",xDate.getFullYear(),"month",xDate.getMonth(),"day",xDate.getDate())

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
                            <label>Distance</label>
                            <input
                                id = "distance"
                                className="form-control input-bg-white input-no-border"
                                placeholder="0 km"
                                type="text"
                                name = "distance"
                                disabled
                                ref = {(c) => {this.distance = c;}}
                                value = {this.props.distance + ' km'}
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
                    </div>
                </div>
            </div>
        )
    }
}