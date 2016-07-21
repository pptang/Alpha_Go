import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import EventFormContainer from '../containers/EventFormContainer.js';

class EventsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="events_new" />
        <EventFormContainer />
      </div>
    )
  }
}

export default EventsNew;
