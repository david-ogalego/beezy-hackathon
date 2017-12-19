import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
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
        "Ocp-Apim-Subscription-Key": "d1164832b71449cebc47ee3fe7b565b6"
      },
      mode: "cors"
    }).then(function(response) {
      return response.json();
    }).then((results) => {
      this.setState({
        results
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
      </div>
    );
  }
}

export default App;
