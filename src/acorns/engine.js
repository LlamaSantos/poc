import dispatcher from './dispatcher'
import store from './store'

export default function Engine({ actions }) {
  const events = dispatcher()
  actions.map(a => a(events, store))
  return {
    store,
    events: events
  }
}
