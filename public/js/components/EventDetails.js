import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CheckBox from './CheckBox.js';

class EventDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.setState({
      place_options: []
    });
  }

  componentWillUnmount() {

     this.props.resetEvent();
  }

  componentDidMount() {

    this.props.getEventById(this.props.eventId);

  }

  componentWillReceiveProps(nextProps) {

    if (!this.props.activeEvent.event && nextProps.activeEvent.event) {
      console.log("componentWillReceiveProps")
      this.setState({
        place_options: nextProps.activeEvent.event.place_options.map((option) => {
          return {...option, checked: false};
        })
      });
    }
  }

  handleCheck = (id) => {

    return () => {
      {/*this.setState({
        place_options: this.state.place_options.map((option) => {
          if (option.id === id) {

            return {...option, checked: !option.checked};
          }
          return option;
        })
      }); */}
      this.setState((prevState, props) => {
        return {
          place_options: prevState.place_options.map((option) => {


            if (option.id === id) {

              return {...option, checked: !option.checked};
            }
            return option;
          })

        };

      });
    }

  }

  renderOptions() {

    return this.state.place_options.map((option) => {
      return (
        <li className="list-group-item">
          <CheckBox isChecked={option.checked} handleCheck={this.handleCheck(option.id)} title={option.title} />
        </li>
      );
    });
  }

  handleVote = () => {
    this.props.voteForOptions(this.state.place_options.filter((option) => option.checked)
                                                      .map((option) => option.id));
    
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
              {this.renderOptions()}
            </ul>
            <button type="button" className="btn btn-default" onClick={this.handleVote}>Vote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;
