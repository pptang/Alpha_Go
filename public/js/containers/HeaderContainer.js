import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/users';
import Header from '../components/header.js';


function mapStateToProps (state) {

  return {
    authenticatedUser: state.UserReducer.status === 'authenticated' ? state.UserReducer.user : null,
    user: state.UserReducer.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      sessionStorage.removeItem('jwtToken');
      dispatch(logoutUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
