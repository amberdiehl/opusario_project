import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class CheckBoxRadioComponent extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount() {
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }
    handleOnClick(e) {
        if (this.props.inputType === 'checkbox') {
            this.props.actions.setCheckedValue(this.props.namespace, (e.target.checked) ? 'yes' : 'no');
        } else {
            this.props.actions.setCheckedValue(this.props.namespace, e.target.value);
        }
    }
    renderItem(item, index) {
        return (
            <React.Fragment>
                <input type={this.props.inputType} id={`${this.props.componentId}-${item.value}`}
                       name={this.props.componentId}
                       key={index}
                       value={item.value}
                       onClick={this.handleOnClick}
                       checked={(this.props.valueChecked === 'yes') ? 'checked' : ''}
                />
                <label htmlFor={`${this.props.componentId}-${item.value}`}>{item.label}</label>
            </React.Fragment>
        )
    }
    render() {
        return (
                <div className={"row gtr-0 gtr-uniform"}>
                    <FormFieldLabel componentId={this.props.componentId}/>
                    <div className={"col-6"}>
                        {this.props.items.map((item, index) => (
                            this.renderItem(item, index)
                        ))}
                    </div>
                    <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                 </div>
        );
    }
}

CheckBoxRadioComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,  // should only be 'checkbox' or 'radio'
    items: PropTypes.array.isRequired,
    valueChecked: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
};
