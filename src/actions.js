/*
 * Author: James Eggington
 * Date: Tue 13 Feb 2018 12:58:51 AEDT
 *
 * Redux action creators.
 */

/**
 * Creates an action that updates user details. If the updated user props do
 * not contain all the possible user props, only the present props are updated.
 */
function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    user:user
  }
}

/**
 * Creates an action that updates user account details
 */
function updateAccount(account) {
  return {
    type: 'UPDATE_ACCOUNT',
    account: account
  }
}

/**
 * Creates an action that updates reimbursement details.
 */
function updateReimbursement(reimbursement) {
  return {
    type: 'UPDATE_REIMBURSEMENT',
    reimbursement: reimbursement
  }
}

/**
 * Creates an action creator to create a new reimbursement item. If initial
 * prop values are provided they will be assigned to the item, otherwise values
 * are undefined.
 */
function createReimbursementItem(reimbursementItem) {
  return {
    type: 'CREATE_REIMBURSEMENT_ITEM',
    reimbursementItem: reimbursementItem
  }
}

/**
 * Action creator to that updates a reimbursement item's details.
 */
function updateReimbursementItem(id, reimbursementItem) {
  return {
    type: 'UPDATE_REIMBURSEMENT_ITEM',
    id: id,
    reimbursementItem: reimbursementItem
  }
}

/**
 * Removes a single reimbursement item.
 */
function removeReimbursementItem(id) {
  return {
    type: 'REMOVE_REIMBURSEMENT_ITEM',
    id: id
  }
}

/**
 * Cleans up after form submission
 */
function formSubmitted() {
  return function(dispatch) {
    console.log("Form submitted");
  }
}

/**
 * Submits the form with images.
 */
function submitForm() {
  return function(dispatch, getState) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
      dispatch(formSubmitted());
    });
    xhr.open("POST", "/reimbursements");
    var state = getState(),
      formData = new FormData();
    formData.append("user", JSON.stringify(state.user));
    formData.append("reimbursement", JSON.stringify(state.reimbursement));
    Object.keys(state.reimbursement.items).forEach(function(key) {
      var reimbursementItem = state.reimbursement.items[key];
      formData.append('images["' + key + '"]', reimbursementItem.image);
    });
    xhr.send(formData);
  }
}

module.exports = {
  updateUser,
  updateAccount,
  updateReimbursement,
  createReimbursementItem,
  updateReimbursementItem,
  removeReimbursementItem,
  submitForm
};
