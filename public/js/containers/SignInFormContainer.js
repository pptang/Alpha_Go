import SignInForm from '../components/SignInForm.js';
import { signInUser, signInUserSuccess, signInUserFailure}  from '../actions/users';
import { reduxForm } from 'redux-form';

// Client side validation
function validate(values) {
  var errors = {};

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
  }
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Wrong Format';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  }
  return errors;
}

const validateAndSignInUser = (values, dispatch) => {

  return new Promise((resolve, reject) => {
    dispatch(signInUser(values))
      .then((response) => {
        let data = response.payload.data;

        if (response.payload.status != 200) {
          dispatch(signInUserFailure(response.payload));
          reject(data);
        } else {
          sessionStorage.setItem('jwtToken', response.payload.data.token);
          dispatch(signInUserSuccess(response.payload));
          resolve();
        }
      });
  });
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.UserReducer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: validateAndSignInUser

  };
}

export default reduxForm({
  form: 'SignInForm',
  fields: ['email', 'password'],
  null,
  null,
  validate
}, mapStateToProps, mapDispatchToProps)(SignInForm);
