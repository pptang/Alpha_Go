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
     this.props.resetDeletedEvent();
  }

  componentDidMount() {

    this.props.getEventById(this.props.eventId);

  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.deletedEvent.error && nextProps.deletedEvent.error.message) {//delete failure
      alert(nextProps.deletedEvent.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedEvent.event && !nextProps.deletedEvent.error) {//delete success
      this.context.router.push('/');
    }

    if (!this.props.activeEvent.event && nextProps.activeEvent.event) {

      this.setState({
        place_options: nextProps.activeEvent.event.place_options.map((option) => {
          return {...option, checked: false};
        })
      });
    }

    if (this.props.activeEvent.event && !this.props.activeEvent.event.isVoted && nextProps.activeEvent.event.isVoted) {
      this.setState({
        place_options: nextProps.activeEvent.event.place_options.map((option) => {
          return {...option, checked: false};
        })
      });
    }

  }

  renderDeleteEventBtn() {
    if (this.props.activeEvent.event.holder_id === this.props.user.id) {
      return (
        <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>
          Delete Event
        </button>
      );
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

  renderOptionDiv() {
    console.log(JSON.stringify(this.props.activeEvent))
    console.log(JSON.stringify(this.state.place_options))
    if (this.props.activeEvent.event.isVoted) {
      return (
        <div>
          <ul className="list-group">
            {this.renderOptions(false)}
          </ul>
          <h3>Has already Voted</h3>
        </div>

      );
    } else {
      return (
        <div>
          <ul className="list-group">
            {this.renderOptions(true)}
          </ul>
          <button type="button" className="btn btn-default" onClick={this.handleVote}>Vote</button>
        </div>
      );
    }
  }

  renderOptions(shouldShowCheckbox) {

    return this.state.place_options.map((option) => {
      return (
        <li className="list-group-item">
          <span className="badge">{option.count}</span>
          <CheckBox isChecked={option.checked} handleCheck={this.handleCheck(option.id)}
            title={option.title} shouldShowCheckbox={shouldShowCheckbox} />
        </li>
      );
    });

  }

  handleVote = () => {
    var sendBody = {
      options: this.state.place_options.filter((option) => option.checked)
                                        .map((option) => option.id),
      event_id: this.props.activeEvent.event.id
    };
    this.props.voteForOptions(sendBody);

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
            {this.renderOptionDiv()}

          </div>
          {this.renderDeleteEventBtn()}
        </div>

      </div>
    );
  }
}

export default EventDetails;
