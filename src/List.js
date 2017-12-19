import React from 'react';

export default (props) => {
    return (
        <ul>
            {props.items.map(element =>
                <li>
                    Title: {element.title}
                    Description: {element.description}
                    Url: {element.url}
                </li>
            )}
        </ul>
    );
};