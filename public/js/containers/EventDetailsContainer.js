import EventDetails from '../components/EventDetails.js';
import { getEventById, getEventByIdSuccess, getEventByIdFailure, resetActiveEvent, resetDeletedEvent} from '../actions/events';
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
       console.log("getEventy:::");
       let token = sessionStorage.getItem('jwtToken');
       dispatch(getEventById(id, token))
          .then((response) => {
            console.log("event::::" + JSON.stringify(response.payload.data.event));
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
     }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
