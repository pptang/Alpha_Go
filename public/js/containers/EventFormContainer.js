import EventsForm from '../components/EventsForm.js';
import {
  newEvent, newEventSuccess, newEventFailure,
  resetEventState
} from '../actions/events';
import {
  generateOptions
} from '../actions/utils';

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

  return errors;
}

const validateAndCreateEvent = (values, dispatch) => {

  //TODO: modify date to timestamp

  console.log("ValidateAndCreateEvent::" + JSON.stringify(values));

  if (!values.place_options || values.place_options.length == 0) {
    alert('At least create one option!');
    return;
  }

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
    createEvent: validateAndCreateEvent,
    resetState: () => {dispatch(resetEventState());},
    generateOptions: () => {
      dispatch(generateOptions());

    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    newEvent: state.EventReducer.newEvent
  };
}

export default reduxForm({
  form: 'EventsForm',
  fields: ['title', 'description', 'date', 'place_options'],
  null,
  null,
  validate

}, mapStateToProps, mapDispatchToProps)(EventsForm);
