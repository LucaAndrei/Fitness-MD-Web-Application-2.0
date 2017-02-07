let DEBUG = false;
let LOG_TAG = "client/modules/set-scroll";

export default function( containerId ) {
	let messages = document.getElementById( containerId );
	if (DEBUG) {
        console.log(LOG_TAG,"set-scroll messages : ",messages);
    }
	if (messages != null) {
		setTimeout( () => { messages.scrollTop = messages.scrollHeight; }, 300 );
	}

}