import bus from './bus'

export default function listener(event, handler) {
  const n = name(event)
  bus.on(n, handler)
}

