import 'whatwg-fetch'

export default (events, store) => 
  events.subject('accounts')
    .handles('remove', (event, done) => {
      fetch(`/api/accounts/${event.data.id}`, { method: 'DELETE' })
      .then(() => 
        store.remove(
          event.subject,
          data => data.filter(i => i.id !== parseInt(event.data.id, 0))
        )
      )
      .catch(err => done(err))
    })