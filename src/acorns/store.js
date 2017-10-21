const bus = require('./bus');
const data = new Map();

const noop = () => {}
const info = console.info.bind(console, 'store')

bus.onAny((...args) => info('bus', 'any', ...args))


const clear = () => {
  data.clear()
  bus.removeAllListeners()
};
const init = (kv) => Object.keys(kv).forEach(key => data.set(key, kv[key]));
const get = (key, defaults) => data.has(key) ? data.get(key) : defaults;
const set = (key, value, done=noop) => {
  data.set(key, value);
  bus.emit(key, 'set', value);
  done(null, value)
}
const remove = (key, filter, done=noop) => {
  let value = filter(get(key))
  set(key, value)
  done(null, value)
}
const subscribe = (key, handler) => bus.on(key, handler)
const unsubscribe = (key, handler) => bus.removeListener(key, handler);
const merge = (key, value, done=noop) => {
  if (data.has(key)) {
    let stored = data.get(key)
    console.info('store', 'merge', 'found', key, value, stored)

    Array.isArray(stored) ?
      set(key, stored.concat(value), done) :
      set(key, Object.assign(stored || {}, value), done)
  } else {
    console.info('store', 'merge', 'miss', key, value)
    set(key, value, done)
  }
}

const store = {
  clear,
  init,
  get,
  set,
  merge,
  remove,
  subscribe,
  unsubscribe
};

export default store;