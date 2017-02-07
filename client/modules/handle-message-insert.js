let DEBUG = false;
let LOG_TAG = "client/modules/handle-message-insert";

export default function(message, destinationUserId ) {
    let text      = message.value.trim(),
        canInsert = (text !== '' ? true : false);
    if (DEBUG) {
        console.log(LOG_TAG,"handle-message-insert text : ",text, " >>> canInsert : ",canInsert);
    }
    if (canInsert) {
        let message = {
            destination : destinationUserId,
            message : text
        }
        if (DEBUG) {
            console.log(LOG_TAG,"insert message",message);
        }
        Meteor.call( 'insertMessage', message, ( error ) => {
            if ( error ) {
                console.error(LOG_TAG,"ERROR INSERTING MESSAGE",error);
            } else {
                if (DEBUG) {
                    console.log(LOG_TAG,"MESSAGE WAS INSERTED SUCCESSFULLY" );
                }

                document.getElementById('messageInput').value = '';
            }
        });
    } else {
        console.error(LOG_TAG,"COULD NOT INSERT MESSAGE. MESSAGE VALUE IS EMPTY");
    }
}