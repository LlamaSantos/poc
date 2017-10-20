import 'whatwg-fetch'

export default (events, store) =>
  events.subject('accounts')
    .handles('create', (event, done) => {
      fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data)
      })
      .then(res => res.json())
      .then(data => (store.merge(event.subject, [data], done)))
      .catch(err => {
        console.error('action', 'list', 'itemCreate', err)
        done(err)
      })
    })

// export default (events, store) => ({
//   [events.account.key(i => i.create)]: (event, done) => {
//     fetch('/api/accounts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(event.data)
//     })
//     .then(res => res.json())
//     .then(data => (store.merge(event.subject, [data], done)))
//     .catch(err => {
//       console.error('action', 'list', 'itemCreate', err)
//       done(err)
//     })
//   }
// })