let DEBUG = false;
let LOG_TAG = "client/modules/sort-messages";

let _getTimeDifference = ( previousTime, currentTime ) => {
    if (DEBUG) {
        console.log(LOG_TAG,"_getTimeDifference previousTime : ",previousTime, " >>> currentTime : ",currentTime);
    }
    let previous   = moment( previousTime ),
        current    = moment( currentTime );
    var timeDifference =  moment( current ).diff( previous, 'minutes' );
    if (DEBUG) {
        console.log(LOG_TAG,"_getTimeDifference timeDifference : ",timeDifference);
    }
    return timeDifference;
}

let _checkIfOwner = ( previousMessage, message ) => {
    let isOwner = typeof previousMessage !== 'undefined' && previousMessage.owner === message.owner;
    if (DEBUG) {
        console.log(LOG_TAG,"_checkIfOwner isOwner : ",isOwner);
    }
    return isOwner;
};

let _decideIfShowHeader = ( previousMessage, message ) => {
    if (DEBUG) {
        console.log(LOG_TAG,"_decideIfShowHeader previousMessage : ",previousMessage, " >>> message : ",message);
    }
    if ( _checkIfOwner( previousMessage, message ) ) {
        message.showHeader =  _getTimeDifference( previousMessage.timestamp, message.timestamp ) >= 5;
    } else {
        message.showHeader = true;
    }
    if (DEBUG) {
        console.log(LOG_TAG,"_decideIfShowHeader modified message : ",message);
    }
}

let _mapMessages = ( messages ) => {
    let previousMessage;
    return messages.map( ( message ) => {
        _decideIfShowHeader( previousMessage, message );
        previousMessage = message;
        return message;
  });
};


export default function(messages) {
    if (DEBUG) {
        console.log(LOG_TAG,"sort-messages messages : ",messages);
    }
    return _mapMessages( messages );
}