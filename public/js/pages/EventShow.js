import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../containers/HeaderContainer.js';
import EventDetailsContainer from '../containers/EventDetailsContainer.js';

class EventShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    console.log("EventSHow mount");
  }

  render() {
    return (
      <div className='container'>
        <Header type="event_detail" eventId={this.props.params.id}/>
        <EventDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default EventShow;
