import EventDetails from '../components/EventDetails.js';
import { getEventById, getEventByIdSuccess, getEventByIdFailure} from '../actions/events';
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
       dispatch(getEventById(id))
          .then((response) => {

            let data = response.payload.data
            if (response.payload.status != 200) {
              dispatch(getEventByIdFailure(response.payload));
            } else {
              dispatch(getEventByIdSuccess(response.payload));
            }
          });
  	 }
    //  ,
    //  resetMe: () =>{
    //   //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
    //     dispatch(resetActivePost());
    //     dispatch(resetDeletedPost());
    //  }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
