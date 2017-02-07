import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';


import ChartistGraph from 'react-chartist';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/DashboardGraphs";

export default class DashboardGraphs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render DashboardGraphs this.props: ",this.props)
        }
        const {
            usersBehaviorData,
            usersBehaviorOptions,
            usersBehaviorType,

            usersByCountryData,
            usersByCountryOptions,
            usersByCountryType,
            countries
        } = this.props;

        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Users Behavior</h4>
                            <p className="category">24 Hours performance</p>
                        </div>
                        <div className="content">
                            <ChartistGraph data={usersBehaviorData} options={usersBehaviorOptions} type={usersBehaviorType} className={'ct-chart'} />
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
                            <ChartistGraph data={usersByCountryData} options={usersByCountryOptions} type={usersByCountryType} className={'ct-chart'} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}