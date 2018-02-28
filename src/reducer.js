/*
 * Author: James Eggington
 * Date: Wed 14 Feb 2018 14:11:44 AEDT
 *
 * Reducer to generate new state.
 */

function getRandomId() {
  var values = new Uint32Array(2);
  window.crypto.getRandomValues(values);
  return values.join('');
}

function reducer(state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case 'UPDATE_USER':
      newState.user = Object.assign({}, state.user, action.user);
      break;
    case 'UPDATE_ACCOUNT':
      if(!state.user) {
        newState.user = {}
      }
      newState.user.account = Object.assign({}, state.user.account, action.account);
      break;
    case 'UPDATE_REIMBURSEMENT':
      newState.reimbursement = Object.assign({}, state.reimbursement, action.reimbursement)
      break;
    case 'CREATE_REIMBURSEMENT_ITEM':
      newState.reimbursement.items = Object.assign({}, state.reimbursement.items)
      newState.reimbursement.items[getRandomId()] = Object.assign({}, action.reimbursementItem)
      break;
    case 'UPDATE_REIMBURSEMENT_ITEM':
      newState.reimbursement.items = Object.assign({}, state.reimbursement.items)
      newState.reimbursement.items[action.id] = Object.assign(
        {},
        newState.reimbursement.items[action.id],
        action.reimbursementItem
      );
      break;
    case 'REMOVE_REIMBURSEMENT_ITEM':
      if(Object.keys(state.reimbursement.items).length > 1) {
        newState.reimbursement.items = Object.assign({}, state.reimbursement.items)
        delete newState.reimbursement.items[action.id]; 
      }
      break;
    default:
      break;
  }
  return newState;
}

export default reducer;
