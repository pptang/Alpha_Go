import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  renderSignInLinks(authenticatedUser) {
    if (authenticatedUser) {
      return (
        <ul className="nav nav-pills navbar-right">
          <li style={{paddingRight: '10px'}} role="presentation">
            {authenticatedUser.email}
          </li>
          <li style={{paddingRight: '10px'}} role="presentation">
            <a href="#" style={{color: '#996633', fontSize: '17px'}} onClick={this.props.logout}>
              Log out
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav nav-pills navbar-right">
        <li style={{paddingRight: '10px'}} role="presentation">
          <Link style={{color:'#996633', fontSize: '17px'}} to="/signup">
            Sign up
          </Link>
        </li>
        <li style={{paddingRight: '10px'}} role="presentation">
          <Link style={{color:'#996633', fontSize: '17px'}} to="/signin">
            Sign in
          </Link>
        </li>
      </ul>
    );
  }

  renderLinks() {

    const { type, authenticatedUser } = this.props;
    switch(type) {
      case 'home':
        return (
          <div className="container">
            <ul className="nav nav-pills navbar-right">
              <li style={{paddingRight: '10px'}} role="presentation">
                <Link style={{color: '#337ab7', fontSize: '17px'}} to="/events/new">
                  New Event
                </Link>
              </li>
            </ul>
            {this.renderSignInLinks(authenticatedUser)}
          </div>

        );
      case 'sign_in':
      case 'sign_up':
      case 'events_new':
        return (
          <div className="container">
            <ul className="nav nav-pills navbar-left">
              <li style={{padingRight: '10px'}} style={{color: '#337ab7', fontSize: '17px'}} role="presentation">
                <Link className="text-xs-right" style={{color: '#33ab7', fontSize: '17px'}} to="/">
                  Back To Home
                </Link>
              </li>
            </ul>

            {this.renderSignInLinks(authenticatedUser)}
          </div>
        );
      default:
        return (
          <div>
            Outing App
          </div>
        );
    }

  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div id="navbar" className="navbar-collapse collapse">
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

export default Header
