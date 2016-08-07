import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CheckBox from './CheckBox.js';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class EventDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      place_options: [],
      showBillingModal: false,
      currentBill: {
        billAmount: 0,
        user: {
          email: '',
          id: 0
        }
      },
      billList: []

    };


  }

  handleCreateBill = (newBill) => {
    if (newBill.user.email.length === 0) {
      alert("You should select a participant!");
      return;
    }
    if (newBill.billAmount === 0) {
      alert("You should enter the amount of money!");
      return;
    }
    this.setState((prevState, props) => {
      return {
        ...prevState,
        currentBill: {
          billAmount: 0,
          user: {
            email: '',
            id: 0
          }
        },
        billList: [...prevState.billList, newBill]
      };
    });
  }

  handleDeleteBill = (index) => {
    this.setState({
      ...this.state,
      billList: this.state.billList.filter((_, i) => i !== index)
    });
  }

  renderBillList = () => {
    return this.state.billList.map((bill, index) => {
      return (
        <li className="list-group-item" key={index}>
          {bill.user.email}
          {`\$${bill.billAmount}`}
          <span className="badge btn btn-default" onClick={() => this.handleDeleteBill(index)}>X</span>
        </li>
      );
    });
  }

  closeModal = () => {
    this.setState({
      showBillingModal: false
    });
  }

  openModal = () => {
    this.setState({
      showBillingModal: true
    });
  }

  sendBills = () => {

    var sendBody = {
      "bills": this.state.billList.map((bill) => {
        return {
          "event_id": parseInt(this.props.eventId),
          "user_id": this.props.user.id,
          "creditor_id": bill.user.id,
          "amount": parseInt(bill.billAmount),
          "is_cleared": false
        };
      })
    };
    this.props.sendBills(sendBody);
    this.closeModal();
  }

  componentWillMount() {
    console.log(JSON.stringify(this.state))

    this.props.getAllUsers();
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
        <div className="btn-group">
          <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>
            Delete Event
          </button>
        </div>
      );
    }

  }

  handleAmountChange = (event) => {

    this.setState({
      ...this.state,
      currentBill: {
        ...this.state.currentBill,
        billAmount: event.target.value
      }
    });
  }

  handleSelectChange = (event) => {

    this.setState({
      ...this.state,
      currentBill: {
        ...this.state.currentBill,
        user: this.props.users[event.target.value]
      }
    });
  }

  renderBillingBtn() {
    if (this.props.activeEvent.event.holder_id === this.props.user.id) {
      return (
        <div>
          <div className="btn-group">
            <button className="btn btn-success pull-xs-right" onClick={this.openModal}>
              Billing
            </button>
          </div>

          <Modal show={this.state.showBillingModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Sending bills to participants</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form>
                <FormGroup controlId="formControlsSelect">
                  <FormControl type="text" placeholder="Enter amount of money" value={this.state.currentBill.billAmount} onChange={this.handleAmountChange} inline></FormControl>
                  <FormControl componentClass="select" placeholder="Select a participant" inline onChange={this.handleSelectChange}>
                    <option selected disabled hidden>Select a participant</option>
                    {this.renderEventParticipant()}
                  </FormControl>
                </FormGroup>

                <button type="button" className="btn btn-default" onClick={() => this.handleCreateBill(this.state.currentBill)}>Create</button>
                <div className="form-group">
                  <ul className="list-group">
                    {this.renderBillList()}
                  </ul>
                </div>

              </form>



            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-success" onClick={this.sendBills}>Send</button>
              <button className="btn btn-default" onClick={this.closeModal}>Cancel</button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
  }

  renderEventParticipant = () => {
    console.log("users::" + JSON.stringify(this.props.users))
    console.log("id::" + this.props.user.id);
    return this.props.users.filter((user) => user.id !== this.props.user.id).map((user, index) => {
      return (
        <option value={index}>{user.email}</option>
      );
    });


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

        </div>

        {this.renderBillingBtn()}
        {this.renderDeleteEventBtn()}

      </div>
    );
  }
}

export default EventDetails;
