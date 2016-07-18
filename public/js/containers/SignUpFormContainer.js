import SignUpForm from '../components/SignUpForm.js';
import { signUpUser, signUpUserSuccess, signUpUserFailure } from '../actions/users';
import { reduxForm } from 'redux-form';

function validate(values) {
  var errors = {};

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter your email';
  }
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Wrong Format';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password And Confirm Password don\'t match';
  }

  return errors;
}

const validateAndSignUpUser = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(signUpUser(values))
      .then((response) => {
        let data = response.payload.data;

        if (response.payload.status != 200) {
          dispatch(signUpUserFailure(response.payload));
          reject(data);
        } else {
          
          sessionStorage.setItem('jwtToken', response.payload.data.token);
          dispatch(signUpUserSuccess(response.payload));
          resolve();
        }
      });
  });
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.UserReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: validateAndSignUpUser
  }
}

export default reduxForm({
  form: 'SignUpForm',
  fields: ['email', 'password', 'confirmPassword'],
  null,
  null,
  validate
}, mapStateToProps, mapDispatchToProps)(SignUpForm);
