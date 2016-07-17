import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SignUpForm extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps))
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {asyncValidating, fields: { email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.props.signUpUser.bind(this))}>
          <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Email</label>
            <input type="text" placeholder="Email" className="form-control" {...email} />
            <div className="help-block">
              {email.touched ? email.error : ''}
            </div>
          </div>

          <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Password</label>
            <input type="password" placeholder="Password" className="form-control" {...password} />
            <div className="help-block">
              {password.touched ? password.error : ''}
            </div>
          </div>

          <div className={`form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" className="form-control" {...confirmPassword} />
            <div className="help-block">
              {confirmPassword.touched ? confirmPassword.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
          <Link to="/" className="btn btn-error">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default SignUpForm;
