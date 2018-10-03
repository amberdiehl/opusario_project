import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class InputComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // load with text provided by parent component
    }
    render() {
        const showErrorStyle = {display: "block"};
        const hideErrorStyle = {display: "none"};
        return (
            <div className={"form-field-group"}>
                <div className={"row gtr-uniform"}>
                    <input type={"text"} />
                </div>
                <div className={"row"} style={(this.props.isError) ? showErrorStyle : hideErrorStyle}>
                    <div className={"col-10 component-error-message"}>
                        {this.props.errorMessage}
                    </div>
                </div>
            </div>
        );
    }
}

InputComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
};
