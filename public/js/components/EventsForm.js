import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css')

class EventsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps::" + JSON.stringify(nextProps))
    if (nextProps.newEvent.event && nextProps.newEvent.event.title && !nextProps.newEvent.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const { fields: { title, description, date }, handleSubmit, submitting } = this.props;
    if (!date.value) {

      date.value = moment()

    }
    // var onDateChange = function(...args) {
    //   console.log("typeof args::" + typeof(args));
    //   console.log(args);
    //   console.log("args stringify::" + JSON.stringify(args));
    //
    //   console.log("before onChange");
    //   console.log(date);
    //   date.onChange(...args)
    //   console.log("after onChange");
    //   console.log(date);
    //
    // }
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
            <label className="control-label">Date</label>
            <DatePicker selected={ moment(date.value)} {...date} className="form-control" />
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
