import expect from 'expect'
import * as actions from '../js/actions/users.js'

describe('actions', () => {
  it('should create an action to sign in', () => {
    const formValues = {
      email: 'a@a.com',
      password: '1234'
    }
    const payload = {}
    const expectedAction = {
      type: actions.SIGNIN_USER,
      payload
    }
    expect(actions.signInUser(formValues)).toEqual(expectedAction)
  })
})
