import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class EventsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.newEvent.event && !nextProps.newEvent.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const { fields: { title, description }, handleSubmit, submitting } = this.props;

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
