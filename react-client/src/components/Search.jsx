import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      term: ''
    }
  }

  handleSearchInput(e){
    e.preventDefault();
    this.setState({term:e.target.value});
  }

  render(){
    return(
        <div>
        <input  type="text" onChange={(e)=>this.handleSearchInput(e)} placeholder="Search Wikipedia"/>
        <button onClick={()=>this.props.search(this.state.term)} type="submit">Search</button>
        </div>
      )
  }
};

export default Search;
