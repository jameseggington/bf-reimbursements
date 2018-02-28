import reducer from './reducer'

/**
 * Tests that the reducer updates user properties correctly
 */
it('updates user props correctly', () => {
  var state = {
    user: {
      name: 'name',
      password: 'password'
    }
  };
  var action = {
    type: 'UPDATE_USER',
    user: {
      name: 'uname',
      password: 'upassword'
    }
  };
  var newState = reducer(state, action);
  expect(newState.user.name).toBe(action.user.name);
  expect(newState.user.password).toBe(action.user.password);
});


