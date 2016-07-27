import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class EventDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    //  this.props.resetMe();
  }

  componentDidMount() {
    this.props.getEventById(this.props.eventId);
  }


  render() {
    const { event, loading, error } = this.props.activeEvent;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!event) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{event.title}</h3>
        <h6>Description: {event.description}</h6>
        <p>{event.date}</p>
        <p>{event.place_options}</p>
      </div>
    );
  }
}

export default EventDetails;
