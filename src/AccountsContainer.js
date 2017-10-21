import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bind from './acorns/bind'

export default bind(
  (props, events) => [
    events.subject('accounts').query('fetch')
  ],
  data => ({ accounts: data}),
  class AccountsContainer extends Component {
    static propTypes = {
      accounts: PropTypes.array.isRequired
    }

    static defaultProps = {
      accounts: []
    }

    add = () => {
      const { events } = this.props
      const username = this.addInput.value
      this.addInput.value = ""

      events.subject('accounts')
        .execute('create', { username })
    }

    removed = () => {
      const { events } = this.props

      events.subject('accounts')
        .execute('remove', { id: this.remove.value })
    }

    render() {
      const { accounts } = this.props

      return <div>
        <h3>Accounts</h3>
        <select ref={ i => this.remove = i }>
          {
            (accounts || []).map(account => (
              <option key={ account.id } value={ account.id }>{ account.username }</option>
            ))
          }        
        </select>
        <button onClick={ this.removed }>Remove</button>
        <div>
          <input type="text" ref={ i => this.addInput = i } />
          <button onClick={ this.add }>Add</button>
        </div>
      </div>
    }
  }
)
