import React from 'react';

const Item = (props) => (
  <div>
  <button onClick={() => props.delete(props.item.name)} type="submit">Delete</button>
  <a href={props.item.url}>
    <h1>{props.item.name}</h1>
    </a>
    <p>{props.item.snippet}</p>
    </div>
)

export default Item;
