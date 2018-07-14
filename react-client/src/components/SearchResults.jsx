import React from 'react';
import Item from './SearchResultsItem.jsx';

var SearchResults = (props) => (
  <div>
  {props.results.map(item=>
      <Item delete={props.delete} item={item} key={item.id}/>
    )}
  </div>
)

export default SearchResults;
