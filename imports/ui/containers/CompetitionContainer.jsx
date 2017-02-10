import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Competitions from '../../api/competitions/Competitions.js';
import CompetitionViewer from '../components/CompetitionViewer.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/CompetitionContainer";

export default createContainer(({ params: { competitionId } }) => {
    const competitionsHandle = Meteor.subscribe('competition', competitionId);

    if (DEBUG) {
        console.log(LOG_TAG, "createContainer competitions : ",Competitions.find({_id : competitionId}).fetch());
    }
    return {
        user: Meteor.user(),
        loading: !(competitionsHandle.ready()),
        competition: Competitions.find({_id : competitionId}).fetch()
    };
}, CompetitionViewer);