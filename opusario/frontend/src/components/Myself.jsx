import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Myself extends Component {
    render() {
        return (
            <div>
                <h1>My Information</h1>
                <p>
                    <Link to="/contact">Click Here</Link> to contact us!
                </p>
            </div>
        )
    }
}
