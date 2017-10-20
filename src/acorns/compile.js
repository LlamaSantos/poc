// function compileBak(dispatch, events) {
//   function event(subject, actionKeys=null) {
//     let actions = Object.assign({}, ...actionKeys.map(key => ({[key]: `${subject}::${key}`})))
//     return {
//       key(fn) {
//         return fn(actions)
//       },
//       do(fn, data=null) {
//         return {
//           subject,
//           data,
//           event: fn(actions)
//         }
//       }
//     }
//   }

//   return Object.assign({},
//     ...Object.keys(events).map(
//       subject => ({ [subject]: event(subject, events[subject]) })
//     )
//   )
// }

const noop = () => {}

function ensure(subject, method) {
  if (!(method in subject)) {
    console.info('ensure', 'subject', subject)
    throw new Error(`Method ${method} is not a member of the subject ${subject.name()}.`)    
  }
}

function compile() {
  let map = {}

  return {
    events(fn) {
      return fn(map)
    },
    subject(name) {
      if (!(name in map)) map[name] = { name: () => name }

      let subject = map[name]

      return {
        name() {
          return name
        },
        handles(method, handler) {
          subject[method] = {
            subject: name,
            event: `${name}::${method}`,
            handler
          }
        },
        query(method, data) {
          ensure(subject, method)
          return {
            subject: name,
            event: subject[method],
            data
          }
        },
        execute(method, data) {
          ensure(subject, method)
          subject[method].handler({
            subject: name,
            event: subject[method],
            data
          }, noop)
        }
      }
    }
  }
}

export default compile;
