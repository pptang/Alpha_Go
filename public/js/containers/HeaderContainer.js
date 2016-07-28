import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/users';
import Header from '../components/header.js';
import { resetDeletedEvent, deleteEvent, deleteEventSuccess, deleteEventFailure  } from '../actions/events';

function mapStateToProps (state) {

  return {
    deletedEvent: state.EventReducer.deletedEvent,
    authenticatedUser: state.UserReducer.status === 'authenticated' ? state.UserReducer.user : null,
    user: state.UserReducer.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    logout: () => {

      sessionStorage.removeItem('jwtToken');
      dispatch(logoutUser());

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
