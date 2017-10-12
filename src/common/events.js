import compile from './compile'

const events = {
  list: [
    'fetch', 'create', 'update', 'delete', 'itemCreate'
  ]
}

const compiled = compile(events)

export default compiled
