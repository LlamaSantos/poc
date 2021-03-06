import 'whatwg-fetch'

export default (events, store) =>
  events.subject('list')
    .handles('fetch', (event, done) => {
      fetch('/api/checklists')
        .then(r => r.json())
        .then(data => store.set(event.subject, data, done))
        .catch(err => done(err))
    })

// export default (events, store) => ({
//   [events.list.key(i => i.fetch)]: (event, done) => {
//     fetch('/api/checklists')
//       .then(r => r.json())
//       .then(data => store.set(event.subject, data, done))
//       .catch(err => done(err))
//   }
// })
