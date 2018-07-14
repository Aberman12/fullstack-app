import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Search Results </h4>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem save={props.save} item={item} key={item.id}/>)}
  </div>
)

export default List;
