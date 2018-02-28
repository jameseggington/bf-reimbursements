/*
 * Author: James Eggington
 * Date: Wed 14 Feb 2018 14:13:37 AEDT
 *
 * Initial state tree for redux.
 */
var initialState = {
  user: {
    name: '',
    password: '',
    account: {
      name: 'James',
      bsb: '923100',
      number: '85534057'
    }
  },
  reimbursement: {
    title: '',
    items: {
      '1': {
        date: '',
        total: 0,
        supplier: '',
        items: ''
      }
    }
  }
}

export default initialState;
