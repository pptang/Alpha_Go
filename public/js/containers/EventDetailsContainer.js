import EventDetails from '../components/EventDetails.js';
import { getEventById, getEventByIdSuccess, getEventByIdFailure, resetActiveEvent, resetDeletedEvent, voteForOptions, voteForOptionsSuccess, voteForOptionsFailure} from '../actions/events';
import { connect } from 'react-redux';



function mapStateToProps(state, ownProps) {
  return {
    activeEvent: state.EventReducer.activeEvent,
    eventId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 getEventById: (id) => {

       let token = sessionStorage.getItem('jwtToken');
       dispatch(getEventById(id, token))
          .then((response) => {

            let data = response.payload.data
            if (response.payload.status != 200) {
              dispatch(getEventByIdFailure(response.payload));
            } else {
              dispatch(getEventByIdSuccess(response.payload));
            }
          });
  	 },
     resetEvent: () =>{

        dispatch(resetActiveEvent());
        dispatch(resetDeletedEvent());
     },

     voteForOptions: (options) => {
       let token = sessionStorage.getItem('jwtToken');
       dispatch(voteForOptions(options, token))
          .then((response) => {

            let data = response.payload.data
            if (response.payload.status != 200) {
              dispatch(voteForOptionsFailure(response.payload));
            } else {
              dispatch(voteForOptionsSuccess(response.payload));
            }
          });
     }

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
