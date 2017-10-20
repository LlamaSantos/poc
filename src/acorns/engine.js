import compile from './compile'
import store from './store'

export default function Engine({ actions }) {
  const events = compile()
  actions.map(a => a(events, store))
  return {
    store,
    events: events
  }
}
