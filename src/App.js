import React, { Component } from 'react';
import { Input, Button, InputGroup, InputGroupButton, ButtonDropdown,
  DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import List from './List';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      querySearch: '',
      results: [],
      typeSearching: 'all',
      urlBingSearch: 'https://api.cognitive.microsoft.com/bing/v7.0/search',
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
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
      const resultsSearching = this.state.typeSearching === 'all' ? results.webPages : results.value;
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
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <div>
        <header class="header">
        </header>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <InputGroup>
                  <InputGroupButton>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        Filter by
                      </DropdownToggle>
                      <DropdownMenu  onChange={this.onChangeSelect}>
                        <DropdownItem>All</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>News</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Videos</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Webpages</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown></InputGroupButton>
                    <Input placeholder="Add your topic here..." onChange={this.onChangeInput} />
                  <InputGroupButton><Button color="primary" onClick={this.search} >Search</Button></InputGroupButton>
                </InputGroup>
                <List items={this.state.results}/>
            </div>
          </div>
        </div>
      </div>





    );
  }
}

export default App;
