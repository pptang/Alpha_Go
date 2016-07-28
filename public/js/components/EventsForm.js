import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css')

class EventsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      editText: '',
      place_options: []
    };

  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps::" + JSON.stringify(nextProps))
    if (nextProps.newEvent.event && nextProps.newEvent.event.title && !nextProps.newEvent.error) {
      this.context.router.push('/');
      this.props.resetState();
    }

    if (nextProps.newEvent.error) {
      alert(nextProps.newEvent.error);
    }

  }

  handleCreate = () => {

    this.setState((prevState, props) => {
      this.props.fields.place_options.onChange([...prevState.place_options, {title: this.state.editText}]);
      return {
        editText: '',
        place_options: [...prevState.place_options, {title: this.state.editText}]
      };
    });

  }

  handleDelete = (index) => {

    this.setState({
      editText: '',
      place_options: this.state.place_options.filter((_, i) => i !== index)
    });
  }

  renderOptionList = () => {
    return this.state.place_options.map((option, index) => {
      return (
        <li className="list-group-item" key={index}>
          {option.title}
          <span className="badge btn btn-default" onClick={() => this.handleDelete(index)}>X</span>
        </li>
      );
    });
  }

  render() {
    const { fields: { title, description, date, place_options }, handleSubmit, submitting } = this.props;
    if (!date.value) {

      date.onChange(moment());

    }

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.props.createEvent.bind(this))}>
          <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Title</label>
            <input type="text" className="form-control" {...title} />
            <div className="help-block">
              {title.touched ? title.error : ''}
            </div>
          </div>
          <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Description</label>
            <input type="text" className="form-control" {...description} />
            <div className="help-block">
              {description.touched ? description.error : ''}
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Date </label>
            <div>
              <DatePicker selected={ moment(date.value)} startDate={moment()} minDate={ moment() } {...date} className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label">Create Options</label>
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.editText} onChange={(event) => this.setState({editText: event.target.value})}/>
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" onClick={() => this.handleCreate()}>Create</button>
              </span>
            </div>
          </div>

          <div className="form-group">
            <ul className="list-group">
              {this.renderOptionList()}
            </ul>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Submit
          </button>
          <Link to="/" className="btn btn-error">Cancel</Link>
        </form>
      </div>
    );
  }
}

export default EventsForm;
