/*
 * Author: James Eggington
 * Date: Tue 13 Feb 2018 14:43:38 AEDT
 *
 * Component to conditionally display a child component
 */

import { Component } from 'react';

class If extends Component {
  render() {
    return this.props.cond ? this.props.children : null;
  }
}

export default If;
