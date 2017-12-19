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
      results: [],
      typeSearching: 'all',
      urlBingSearch: 'https://api.cognitive.microsoft.com/bing/v7.0/search'
    };
  }
  search = () => {
    const searchQuery = this.state.querySearch;
    fetch(`${this.state.urlBingSearch}?q=${this.state.querySearch}`, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "4f21dfbfde98458c936f99435b822b35"
      },
      mode: "cors"
    }).then(function(response) {
      return response.json();
    }).then((results) => {
      const resultsSearching = this.state.typeSearching === 'all' ? results.webPages.value : results.value;
      const resultsParsed = resultsSearching.map((valueSearch) => {
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
  onChangeSelect = (e) => {
    const value = e.target.value;
    if (value === 'All') {
      this.setState({
        typeSearching: 'all',
        urlBingSearch: 'https://api.cognitive.microsoft.com/bing/v7.0/search'
      })
    } else if (value === 'News') {
      this.setState({
        typeSearching: 'news',
        urlBingSearch: 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
      })
    }
  }
  render() {
    return (
      <div>
        <Input placeholder="topic" onChange={this.onChangeInput} />
        <Button color="primary" onClick={this.search} >Search</Button>
        <Input type="select" name="select" id="exampleSelect" onChange={this.onChangeSelect}>
            <option>All</option>
            <option>Images</option>
            <option>News</option>
            <option>Videos</option>
            <option>Webpages</option>
          </Input>
          <Input type="select" name="select" id="filterSelect">
            <option>Freshness</option>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </Input>
        <List items={this.state.results}/>
      </div>
    );
  }
}

export default App;
