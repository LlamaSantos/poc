import { Component } from 'react';
import PropTypes from 'prop-types';
import Engine from './acorns/engine'

export default class Provider extends Component {
  constructor(props, context) {
    super(props, context);

    this.engine = this.props.engine || Engine({})
  }
  getChildContext() {
    return {
      engine: this.engine
    }
  }

  render() {
    return this.props.children
  }
}

Provider.childContextTypes = {
  engine: PropTypes.object
};
