import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/search.jsx';
import axios from 'axios';
import SearchResults from './components/SearchResults.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      database: []
    };
    this.search = this.search.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  // editNames(name){
  // var fin = first.replace(' ', '%20');
  // return fin;
  // };

  // componentDidMount() {
  //   $.ajax({
  //     type:'GET',
  //     url: '/items',
  //     success: (data) => {
  //       console.log('went off');
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  search(input){
    axios
    .get('/items', {params: {input}})
    .then(results => this.setState({items:results.data.search}))
    .catch(err=>console.log('nope your not sending anything',err));
  }

  save(item){
    console.log('this is item title first',item.title);
    var newName = item.title.slice();
    console.log('this should be teh new name',newName);
    var end = newName.replace(' ', '_');
    console.log('this should be the final part of the name', end, item.title);
    axios.post('/items', {
    name: item.title,
    snippet: item.snippet,
    url: 'https://en.wikipedia.org/wiki/' + end
  })
  .then(function (response) {
    console.log('successfully saved!',response);
  })
  .catch(function (error) {
    console.log('did not save',error);
  });
  }

  getDatabase(){
    console.log('hit getDatabase in client');
    $.ajax({
      type:'GET',
      url: '/items',
      success: (data) => {
        console.log('got back data from database ',data);
        this.setState({
          database: data
        });
        console.log('here is your new state',this.state.database)
      },
      error: (err) => {
        console.log('err in get client', err);
      }
    });
  }

  delete(item){
    console.log('it hit delete function', item)
    axios
.delete('/items', { params: {name:item} })
.then(function(response) {
console.log('object deleted ',response.data)
})
.catch(function(error) {
console.log('deletion error ',error);
});
};

  // search(input){
  //   axios
  //   .get('/api/items', option)
  //   .then(result => this.setState({}))
  // }

  render () {
    return (<div>
      <h1>Wiki Search</h1>
      <div className="saved pages">
      <button onClick={()=>this.getDatabase()} type="submit">View Your Saved Pages</button>
      <SearchResults delete={this.delete} results={this.state.database} />
      </div>
      <Search search={this.search}/>
      <List save={this.save} items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
