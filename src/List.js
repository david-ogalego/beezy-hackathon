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
        fetch(`https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`, {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "41c9440bc5814ece8dcd300edb0724f6"
          },
          method: "POST",
          data: description,
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
                    Title: {element.title}
                    Description: {element.description}
                    Url: {element.url}
                    {/* <Button onClick={() => this.seeTags(element.description)} />
                    <ul>
                        {this.state.tags.map(tag =>
                            <li>
                                {tag.title}
                            </li>
                        )}
                    </ul> */}
                </li>
            )}
        </ul>
        );
    }
};