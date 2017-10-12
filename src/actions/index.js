import listFetch from './list-get'
import listAddItem from './list-add-item'

export default (events, store) => Object.assign({},
  listFetch(events, store),
  listAddItem(events, store)
)
