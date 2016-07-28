import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class EventDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {

     this.props.resetEvent();
  }

  componentDidMount() {

    this.props.getEventById(this.props.eventId);

  }

  renderOptions(place_options) {
    return place_options.map((option) => {
      return (
        <li className="list-group-item">
          {option.title}
        </li>
      );
    });
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
      <div className="container-fluid text-center">
        <h2>{event.title}</h2>
        <br/>
        <div className="row slideanim">
          <div>
            <h4>Description</h4>
            <p>{event.description}</p>
          </div>
          <div>
            <h4>Date</h4>
            <p>{event.date}</p>
          </div>
          <div>
            <h4>Options</h4>
            <ul className="list-group">
              {this.renderOptions(event.place_options)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;
