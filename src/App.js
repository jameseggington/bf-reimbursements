import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  updateUser,
  updateAccount,
  updateReimbursement,
  createReimbursementItem,
  updateReimbursementItem,
  removeReimbursementItem,
  submitForm
} from './actions'
import If from './If';

class App extends Component {
  getItemTotals(items) {
    var sum = 0,
      item,
      total = 0;

    for(var itemKey in items) {
      item = items[itemKey];
      total = parseFloat(item.total);
      if(items.hasOwnProperty(itemKey) && !isNaN(total)) {
        console.log(total);
        sum += total;
      }
    }
    return sum;
  }
  render() {
    return (
      <div class="container">
      <h3>Black Flats Rover Crew</h3>
      <h6>Reimbursement Form</h6>
      <form>
      <div class="user">
      <h6 class="twelve columns">User Details</h6>
      <div class="row">
      <div class="six columns">
      <label>Full name</label>
      <input class="u-full-width" type="text" value={this.props.user.name} onChange={this.props.updateUser.bind(this, "name")}/>
      </div>
      <div class="six columns">
      <label>Password</label>
      <input class="u-full-width" type="password" value={this.props.user.password} onChange={this.props.updateUser.bind(this, "password")}/>
      </div>
      </div>
      </div>
      <div class="reimbursement">
      <h6>Reimbursement</h6>
      <div class="twelve columns">
      <label>Title/Description</label>
      <input type="text" class="u-full-width" value={this.props.reimbursement.title} onChange={this.props.updateReimbursement.bind(this, "title")}/>
      </div>
      <div>
      <h6>Receipts</h6>
      </div>
      <div>
      {Object.keys(this.props.reimbursementItems).map(function(key) {
        var reimbursementItem = this.props.reimbursementItems[key]
        return <div class="row reimbursement-item" key={key}>
          <div class="two columns">
          <label class="u-full-width">Manage</label>
          <input class="u-full-width" type="file" onChange={this.props.addReimbursementItemImage.bind(this, key)}/>
          <If cond={Object.keys(this.props.reimbursementItems).length > 1}><button type="button" onClick={this.props.removeReimbursementItem.bind(this, key)}>Remove</button></If>
          </div>
          <div class="two columns">
          <label class="u-full-width">Date</label>
          <input class="u-full-width" type="text" value={reimbursementItem.date} onChange={this.props.updateReimbursementItem.bind(this, key, "date")}/>
          </div>
          <div class="six columns">
          <label class="u-full-width">Supplier</label>
          <input class="u-full-width" type="text" value={reimbursementItem.supplier} onChange={this.props.updateReimbursementItem.bind(this, key, "supplier")}/>
          </div>
          <div class="two columns">
          <label class="u-full-width">Total</label>
          <input class="u-full-width" type="number" value={reimbursementItem.total} onChange={this.props.updateReimbursementItem.bind(this, key, "total")}/>
          </div>
          </div>
      }.bind(this))}
      <div class="centered">
      <button type="button" onClick={this.props.createReimbursementItem}>Add receipt</button>
      </div>
      </div>
      <div class="row">
      <div class="ten columns u-cf"><label class="right">Total:</label></div>
      <div class="two columns"><input class="u-full-width" type="number" step="0.05" disabled value={this.getItemTotals(this.props.reimbursementItems)}/></div>
      </div>
      </div>
      <div class="account">
      <h6>Account Details</h6>
      <div class="row">
      <div class="twelve columns">
      <label>Account Name</label>
      <input class="u-full-width" type="text" value={this.props.account.name} onChange={this.props.updateAccount.bind(this, "name")}/>
      </div>
      </div>
      <div class="row">
      <div class="six columns">
      <label>BSB</label>
      <input class="u-full-width" type="text" value={this.props.account.bsb} onChange={this.props.updateAccount.bind(this, "bsb")}/>
      </div>
      <div class="six columns">
      <label>Account Number</label>
      <input class="u-full-width" type="text" value={this.props.account.number} onChange={this.props.updateAccount.bind(this, "number")}/>
      </div>
      </div>
      </div>
      <div class="row">
      <label>
      <input type="checkbox"/> Save as your new banking details?
      </label>
      <label>
      <input type="checkbox"/> I declare that all information provided is correct
      </label>
      </div>
      <div class="centered">
      <button class="button-primary" type="button" onClick={this.props.submitForm}>Submit</button>
      </div>
      </form>
      </div>
    );
  }
}

export default connect(
  function(state) {
    return {
      user: state.user,
      account: state.user.account,
      reimbursement: state.reimbursement,
      reimbursementItems: state.reimbursement.items
    }
  },
  function(dispatch) {
    return {
      updateUser: function(userProp, event) {
        var user = {}
        user[userProp] = event.target.value;
        dispatch(updateUser(user));
      },
      updateAccount: function(accountProp, event) {
        var account = {}
        account[accountProp] = event.target.value;
        dispatch(updateAccount(account));
      },
      updateReimbursement: function(reimbursementProp, event) {
        var reimbursement = {};
        reimbursement[reimbursementProp] = event.target.value;
        dispatch(updateReimbursement(reimbursement));
      },
      createReimbursementItem: function() {
        dispatch(createReimbursementItem());
      },
      updateReimbursementItem: function(id, reimbursementItemProp, event) {
        var reimbursementItem = {}
        if(reimbursementItemProp === 'total') {
          reimbursementItem[reimbursementItemProp] = parseFloat(event.target.value);
        } else {
          reimbursementItem[reimbursementItemProp] = event.target.value;
        }
        dispatch(updateReimbursementItem(id, reimbursementItem));
      },
      addReimbursementItemImage: function(id, event) {
        var file = event.target.files[0],
          reimbursementItem = {};
        if(file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif"
        ) {
          reimbursementItem['image'] = file;
          dispatch(updateReimbursementItem(id, reimbursementItem));
        }
      },
      removeReimbursementItem: function(id) {
        dispatch(removeReimbursementItem(id));
      },
      submitForm: function() {
        dispatch(submitForm());
      }
    }
  }
)(App);
