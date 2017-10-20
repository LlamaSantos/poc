import './App.css';
import React, { Component } from 'react';
import acorns from './acorns'
import Provider from './Provider'
import actions from './actions'

import TodoContainer from './TodoContainer'
import AccountsContainer from './AccountsContainer'

class App extends Component {
  render() {
    const engine = acorns.Engine({ actions })

    return (
      <div className="App">
        <Provider engine={ engine }>
          <TodoContainer id="5" />
          <AccountsContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
