import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import EventListContainer from '../containers/EventListContainer.js';
class Home extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="home" />
        <EventListContainer />
      </div>
    );
  }
}

export default Home;
