import React from 'react';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Index";

export default class Index extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(LOG_TAG,"componentWillMount",Meteor.user())
        if (Meteor.user() != null && Meteor.user() != undefined) {
            this.context.router.push("/app/dashboard");
        }
    }

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div>
                <div className="row">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="icon-big icon-warning text-center">
                                                        <i className="ti-server"></i>
                                                    </div>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers">
                                                        <p>Capacity</p>
                                                        105GB
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-reload"></i> Updated now
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="icon-big icon-success text-center">
                                                        <i className="ti-wallet"></i>
                                                    </div>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers">
                                                        <p>Revenue</p>
                                                        $1,345
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-calendar"></i> Last day
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="icon-big icon-danger text-center">
                                                        <i className="ti-pulse"></i>
                                                    </div>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers">
                                                        <p>Errors</p>
                                                        23
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-timer"></i> In the last hour
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="icon-big icon-info text-center">
                                                        <i className="ti-twitter-alt"></i>
                                                    </div>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers">
                                                        <p>Followers</p>
                                                        +45
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-reload"></i> Updated now
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="header">
                                            <h4 className="title">Users Behavior</h4>
                                            <p className="category">24 Hours performance</p>
                                        </div>
                                        <div className="content">
                                            <div id="chartHours" className="ct-chart"></div>
                                            <div className="footer">
                                                <div className="chart-legend">
                                                    <i className="fa fa-circle text-info"></i> Open
                                                    <i className="fa fa-circle text-danger"></i> Click
                                                    <i className="fa fa-circle text-warning"></i> Click Second Time
                                                </div>
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-reload"></i> Updated 3 minutes ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="header">
                                            <h4 className="title">Email Statistics</h4>
                                            <p className="category">Last Campaign Performance</p>
                                        </div>
                                        <div className="content">
                                            <div id="chartPreferences" className="ct-chart ct-perfect-fourth"></div>

                                            <div className="footer">
                                                <div className="chart-legend">
                                                    <i className="fa fa-circle text-info"></i> Open
                                                    <i className="fa fa-circle text-danger"></i> Bounce
                                                    <i className="fa fa-circle text-warning"></i> Unsubscribe
                                                </div>
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-timer"></i> Campaign sent 2 days ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card ">
                                        <div className="header">
                                            <h4 className="title">2015 Sales</h4>
                                            <p className="category">All products including Taxes</p>
                                        </div>
                                        <div className="content">
                                            <div id="chartActivity" className="ct-chart"></div>

                                            <div className="footer">
                                                <div className="chart-legend">
                                                    <i className="fa fa-circle text-info"></i> Tesla Model S
                                                    <i className="fa fa-circle text-warning"></i> BMW 5 Series
                                                </div>
                                                <hr />
                                                <div className="stats">
                                                    <i className="ti-check"></i> Data information certified
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>

        )
    }
}

Index.contextTypes = {
    router: React.PropTypes.object,
};