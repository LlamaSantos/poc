import React, { Component } from 'react';
import TodoContainer from './TodoContainer'
import Provider from './Provider'
import './App.css';
import acorns from './acorns'
import events from './common/events'
import actions from './actions'

class App extends Component {
  render() {
    const engine = acorns.Engine({ events, actions })

    return (
      <div className="App">
        <Provider engine={ engine }>
          <TodoContainer id="5" />
        </Provider>
      </div>
    );
  }
}

export default App;
