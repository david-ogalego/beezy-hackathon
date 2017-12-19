import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import List from './List';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      querySearch: '',
      results: []
    };
  }
  search = () => {
    const searchQuery = this.state.querySearch;
    fetch(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${this.state.querySearch}`, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "4f21dfbfde98458c936f99435b822b35"
      },
      mode: "cors"
    }).then(function(response) {
      return response.json();
    }).then((results) => {
      const resultsParsed = results.webPages.value.map((valueSearch) => {
        return {
          title: valueSearch.name,
          description: valueSearch.snippet,
          url: valueSearch.url
        }
      });
      this.setState({
        results: resultsParsed
      });
    })
  }
  onChangeInput = (e) => {
    this.setState({
      querySearch: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Input placeholder="topic" onChange={this.onChangeInput} />
        <Button color="primary" onClick={this.search} >primary</Button>
        <List items={this.state.results}/>
      </div>
    );
  }
}

export default App;
