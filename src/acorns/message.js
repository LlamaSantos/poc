import { name } from './bus'

export default function message(action, data) {
  return {
    action: name(action),
    data: data,
    ts: +new Date
  }
}

