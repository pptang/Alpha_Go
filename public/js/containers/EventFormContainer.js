import EventsForm from '../components/EventsForm.js';
import {
  newEvent, newEventSuccess, newEventFailure
} from '../actions/events';

import { reduxForm } from 'redux-form';

function validate(values) {
  console.log("validate::" + JSON.stringify(values))
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }

  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter some description';
  }

  // if (!values.placeOptions || values.placeOptions.length == 0) {
  //   error.placeOptions = 'At least create one option';
  // }

  // TODO: add date validation
  return errors;
}

const validateAndCreateEvent = (values, dispatch) => {
  console.log("ValidateAndCreateEvent::" + JSON.stringify(values));
  return new Promise((resolve, reject) => {
    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') {
      let error = {error: true, message: 'Please Sign In'};
      dispatch(newEventFailure(error));
      reject(error);
      return;
    }

    dispatch(newEvent(values, token))
      .then((response) => {
        let data = response.payload.data;

        if (response.payload.status != 200) {
          dispatch(newEventFailure(response.payload));
          reject(data);
        } else {
          dispatch(newEventSuccess(response.payload));
          resolve();
        }
      });
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: validateAndCreateEvent
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    newEvent: state.EventReducer.newEvent
  };
}

export default reduxForm({
  form: 'EventsForm',
  fields: ['title', 'description', 'date'],
  null,
  null,
  validate

}, mapStateToProps, mapDispatchToProps)(EventsForm);
