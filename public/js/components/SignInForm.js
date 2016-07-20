import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SignInForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {asyncValidating, fields: {email, password}, handleSubmit, submitting, user } = this.props;

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.props.signInUser.bind(this))}>
          <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Email</label>
            <input placeholder="xxx@xxx.com" type="text" className="form-control" {...email} />
            <div className="help-block">
              {email.touched ? email.error : ''}
            </div>
            <div className="help-block">
              {asyncValidating === 'email' ? 'validating..' : ''}
            </div>
          </div>

          <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Password</label>
            <input type="password" className="form-control" {...password} />
            <div className="help-block">
              {password.touched ? password.error : ''}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}> Submit </button>
          <Link to="/" className="btn btn-error">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default SignInForm;
