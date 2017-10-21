import React from 'react';
import PropTypes from 'proptypes'
import ReactDOM from 'react-dom';
import Provider from './provider';

const actions = {
  get cards() {
    return {
      create(obj) {
        return true
      }
    }
  }
}


function Data(url, Component) {
  Component.prototype.actions = actions
  Component.prototype.data = {}
  return Component
}

const TestContainer = Data('', class TestContainer extends React.Component {
  static propTypes = {
    first: PropTypes.string.isRequired
  }

  static data = { hello: 'world' }

  render() {
    const { first } = this.props
    return (
      <div>
        { first }
      </div>
    )
  }
})


it('Spawn without any issue', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Provider>
      <TestContainer first="hello"/>
    </Provider>, div);
})