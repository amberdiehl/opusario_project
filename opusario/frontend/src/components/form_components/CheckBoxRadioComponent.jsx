import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText, getTextAsTitleCase } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class CheckBoxRadioComponent extends Component {
    constructor(props) {
        super(props);
        this.renderItems = this.renderItems.bind(this);
    }
    componentDidMount() {
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }
    renderItems() {
        return (
            <span>
                {this.props.items.map(item => (
                    <input type={this.props.inputType}
                           id={this.props.componentId}
                           name={this.props.componentId}
                           value={item.value} />
                ))}
            </span>
        )
    }
    render() {
        return (
            <div className={"form-field-group"}>
                <div className={"row gtr-uniform"}>
                    <FormFieldLabel componentId={this.props.componentId}/>
                    <div className={"col-6"}>
                        {this.renderItems()}
                    </div>
                 </div>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
            </div>
        );
    }
}

CheckBoxRadioComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf('checkbox', 'radio'),
    items: PropTypes.array.isRequired,
    valueChecked: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
};
