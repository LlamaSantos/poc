import 'whatwg-fetch'

export default (events, store) => 
  events.subject('accounts')
    .handles('fetch', (event, done) => {
      fetch('/api/accounts')
        .then(r => r.json())
        .then(data => store.set(event.subject, data, done))
        .catch(err => done(err))
    })

// export default (events, store) => ({
//   [events.account.key(i => i.fetch)]: (event, done) => {
//     fetch('/api/accounts')
//       .then(r => r.json())
//       .then(data => store.set(event.subject, data, done))
//       .catch(err => done(err))
//   }
// })
