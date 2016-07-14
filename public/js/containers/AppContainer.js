import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App.js';
import { getUserFromToken, getUserFromTokenSuccess, getUserFromTokenFailure, resetToken } from '../actions/users';

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserFromToken: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') {
        return;
      }

      dispatch(getUserFromToken(token))
        .then((response) => {
          if (!response.error) {
            sessionStorage.setItem('jwtToken', response.payload.data.token);
            dispatch(getUserFromTokenSuccess(response.payload));
          } else {
            sessionStorage.removeItem('jwtToken');
            dispatch(getUserFromTokenFailure(response.payload));
          }
        })

    }
  }
}

export default connect(null, mapDispatchToProps)(App);
