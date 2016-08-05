import EventDetails from '../components/EventDetails.js';
import { getEventById, getEventByIdSuccess, getEventByIdFailure,
  resetActiveEvent, resetDeletedEvent, voteForOptions, voteForOptionsSuccess,
  voteForOptionsFailure, deleteEvent, deleteEventSuccess, deleteEventFailure}
  from '../actions/events';

import { getAllUsers, getAllUsersSuccess, getAllUsersFailure }
  from '../actions/users';

import { connect } from 'react-redux';



function mapStateToProps(state, ownProps) {
  return {
    deletedEvent: state.EventReducer.deletedEvent,
    activeEvent: state.EventReducer.activeEvent,
    user: state.UserReducer.user,
    eventId: ownProps.id,
    users: state.UserReducer.users
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
     onDeleteClick: () => {

       let token = sessionStorage.getItem('jwtToken');

       if (!token || token === '') {
         let error = {error: true, message: 'Please Sign In'};
         dispatch(deleteEventFailure(error));
         return;
       }

     	dispatch(deleteEvent(ownProps.eventId, token))
       	.then((response) => {
           if (response.payload.status != 200) {
             dispatch(deleteEventFailure(response.payload));

           } else {
             dispatch(deleteEventSuccess(response.payload));

           }
       });

   	},
    resetDeletedEvent: () => {

      dispatch(resetDeletedEvent());

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
    },

    getAllUsers: () => {

      let token = sessionStorage.getItem('jwtToken');
      dispatch(getAllUsers(token)).then((response) => {

        if (response.payload.status != 200) {
          dispatch(getAllUsersFailure(response.payload));

        } else {
          dispatch(getAllUsersSuccess(response.payload));

        }
      });

    }

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
