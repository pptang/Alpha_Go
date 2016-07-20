import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class EventList extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if (this.props.isAuthenticate) {
      this.props.getEvents();
    } else {
      this.context.router.push('/signin');
    }
  }

  renderEvents(events) {

    return events.map((event) => {
      return (
          <li className="list-group-item" key={event.id}>
            <Link style={{color: 'black'}} to={"event/" + event.id}>
              <h3 className="list-group-item-heading">{event.title}</h3>
            </Link>
          </li>
      );
    });

  }

  render() {
    const { events, loading, error } = this.props.eventList;
    const { isAuthenticate } = this.props;
    if (loading) {
      return <div className="container"><h1>Outing Events</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Outing Events</h1>
        <ul className="list-group">
          {this.renderEvents(events, isAuthenticate)}
        </ul>
      </div>
    );
  }
}

export default EventList;
