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
      dropdownOpen: false,
      dropdownOpen2: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
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
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
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
                    <InputGroupButton>
                    <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                      <DropdownToggle caret>
                        Freshness
                      </DropdownToggle>
                      <DropdownMenu >
                        <DropdownItem>Day</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Week</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Month</DropdownItem>
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
