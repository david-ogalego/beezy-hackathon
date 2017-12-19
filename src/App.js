import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Input placeholder="topic" />
        <Button color="primary" onClick="">primary</Button>
      </div>
    );
  }
}

export default App;
