import React, { Component } from 'react';
import PropTypes from 'proptypes'
import bind from './acorns/bind'

const Item = ({children}) => <li>{children}</li>

const List = ({ list }) => (
  <ul>
    {
      (list || []).map((i, index )=> <Item key={ index }>{ i.text }</Item>)
    }
  </ul>
)


export default bind(
  /* defines parameterized fetching.  fetch is an action, nothing special*/
  (props, events) => [events.list.do(i => i.fetch, { id: props.id })],

  /* Prior to rendering this function transforms the data into a format the component expects */
  data => ({ list: data }),
  class TodoContainer extends Component {
    static propTypes = {
      id: PropTypes.string,
      list: PropTypes.array,
      loading: PropTypes.bool,
    }

    add = () => {
      const { dispatch, events } = this.props;
      const text = this.addField.value

      if (text) {
        /* Creates the item and triggers a rerender */
        dispatch(
          events.list.do(
            i => i.itemCreate,
            { text }
          )
        )
      }
    }
  
    render() {
      const { list, loading } = this.props;

      if (loading) return ( <div className="loading" /> )

      return (
        <div>
          <List list={list} />
          <div>
            <input type="text" ref={ i => this.addField = i } />
            <button onClick={this.add}>Add</button>
          </div>
        </div>
      );
    }
  }
);
