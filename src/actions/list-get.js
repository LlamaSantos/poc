import 'whatwg-fetch'

export default (events, store) => ({
  [events.list.key(i => i.fetch)]: (event, done) => {
    fetch('/api/list')
      .then(r => r.json())
      .then(data => store.set(event.subject, data, done))
      .catch(err => done(err))
  }
})
