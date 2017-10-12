export default function Dispatcher(actions) {
  return data => {
    actions[data.event](data)
  }
}
