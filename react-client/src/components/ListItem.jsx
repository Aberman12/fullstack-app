import React from 'react';

const ListItem = (props) => (
  <div className="wiki-result">
      <button onClick={()=>props.save(props.item)} type="submit">Save</button>
  <a href="https://en.wikipedia.org/wiki/led%20zeppelin">
  <h1>{ props.item.title }</h1>
    </a>
  <div>{props.item.snippet}</div>
  </div>
)

export default ListItem;
