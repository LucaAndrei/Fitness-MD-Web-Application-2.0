import React from 'react';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChatMessage";

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    createTimestamp(timestamp) {
        //console.log(LOG_TAG,"timestamp",timestamp);
        if (timestamp) {
            let today = moment().format('YYYY-MM-DD'),
            datestamp = moment(timestamp).format('YYYY-MM-DD'),
            isBeforeToday = moment(today).isAfter(datestamp),
            format = isBeforeToday ? 'MMMM Do, YYYY hh:mm a' : 'hh:mm a';
            var formattedTimestamp = moment(timestamp).format(format);
        }
        if(DEBUG) {
            console.log(LOG_TAG,"createTimestamp formattedTimestamp : ",formattedTimestamp)
        }
        return formattedTimestamp;
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render ChatMesssage this.props: ",this.props)
        }

        const {
            message
        } = this.props;


        let className = (message.owner ==  Meteor.userId()) ? "self" : "other";

        return (
            <li className={className}>
                <div className="avatar">
                    <img src="/img/faces/face-2.jpg" alt="crash" />
                </div>
                <div className="msg">
                    <p>
                        {message.message}
                    </p>
                    <div className="card-footer">
                        <i className="ti-check"></i>
                        <h6>{this.createTimestamp(message.timestamp)}</h6>
                    </div>
                </div>
            </li>
        )
    }
}