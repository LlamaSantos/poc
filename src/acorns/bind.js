import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import * as asyncio from 'async'

export default function bind(events, transform, WrappedComponent) {
  class BindableComponent extends Component {
    constructor(props, context) {
      super(props, context)
      
      this.engine = this.context.engine
      this.store = this.engine.store
      this.events = events(props, this.engine.events)
      this.state = { loading: true }
      this.subjects = this.events.map(i => i.subject)
    }

    componentWillMount() {
      const actions = this.events
        .filter(i => i.event in this.engine.actions)
        .map(i => (...args) => this.engine.actions[i.event](i, ...args))

      asyncio.parallel(actions, (err, data) => {
        console.info('bind', 'parallel', err, data)
        this.setState({ loading: false, ...transform(data.length === 1 ? data[0] : data) })
      })

      this.subjects.forEach(subject => this.store.subscribe(subject, this.update))
    }

    componentWillUnmount() {
      this.subjects.forEach(subject => {
        console.info('Unsubscribe', subject)
        this.store.unsubscribe(subject, this.update)
      })
    }

    update = (method, data) => {
      console.info('bind', 'event', method, data)
      this.setState({ loading: false, ...transform(data.length === 1 ? data[0] : data)})
    }

    render() {

      console.info('bind', 'render', this.state)

      return createElement(WrappedComponent, { engine: this.engine, events: this.engine.events, ...this.props, ...this.state});
    }
  }

  WrappedComponent.contextTypes = Object.assign({},
    WrappedComponent.contextTypes,
    { engine: PropTypes.object }
  )

  BindableComponent.contextTypes = { engine: PropTypes.object }

  return BindableComponent;
}
