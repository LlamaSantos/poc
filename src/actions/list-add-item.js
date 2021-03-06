import 'whatwg-fetch'

export default (events, store) =>
  events.subject('list')
    .handles('itemCreate', (event, done) => {
      fetch('/api/checklists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data)
      })
      .then(res => res.json())
      .then(data => {
        console.info('action', 'list', 'itemCreate', event.subject, [data])
        store.merge(event.subject, [data], done)
      })
      .catch(err => {
        console.error('action', 'list', 'itemCreate', err)
        done(err)
      })
    })

// export default (events, store) => ({
//   [events.list.key(i => i.itemCreate)]: (event, done) => {
//     fetch('/api/checklists', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(event.data)
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.info('action', 'list', 'itemCreate', event.subject, [data])
//       store.merge(event.subject, [data], done)
//     })
//     .catch(err => {
//       console.error('action', 'list', 'itemCreate', err)
//       done(err)
//     })
//   }
// })