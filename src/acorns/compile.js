export default function compile(events) {
  function event(subject, actionKeys=null) {
    let actions = Object.assign({}, ...actionKeys.map(key => ({[key]: `${subject}::${key}`})))
    return {
      key(fn) {
        return fn(actions)
      },
      do(fn, data=null) {
        return {
          subject,
          data,
          event: fn(actions)
        }
      }
    }
  }

  return Object.assign({},
    ...Object.keys(events).map(
      subject => ({ [subject]: event(subject, events[subject]) })
    )
  )
}