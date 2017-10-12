import store from './store'
import Dispatcher from './dispatcher'

export default function Engine({events, actions, handlers={}}) {
  for(let key in Object.keys(handlers)) {
    store.subscribe(key, handlers[key]);
  }

  const actionInstance = actions(events, store)
  return {
    events,
    store,
    dispatcher: Dispatcher(actionInstance),
    actions: actionInstance
  }
}
