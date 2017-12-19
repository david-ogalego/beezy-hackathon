import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class List extends Component  {
    constructor() {
        super();
        this.state = {
            tags: []
        };
    }
    seeTags = (description) => {
        var data = new FormData();
        data.append( "json", JSON.stringify( description ) );
        fetch(`https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`, {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "f37984cf8e4b4fc6b10071e7208f89bc"
          },
          method: "POST",
            body: data,
          mode: "cors"
        }).then(function(response) {
          return response.json();
        }).then((results) => {
          const resultsParsed = results.documents.keyPhrases.map((valueSearch) => {
            return {
              title: valueSearch
            }
          });
          this.setState({
            results: resultsParsed
          });
        })
    }
    render() {
        return (
        <ul>
            {this.props.items.map(element =>
                <li>
                    <p>
                    Title: {element.title}
                    </p>
                    <p>
                    Description: {element.description}
                    </p>
                    <p>
                    Url: {element.url}
                    </p>
                    <Button onClick={() => { this.seeTags(element.description)} }>See tags</Button>
                </li>
            )}
        </ul>
        );
    }
};