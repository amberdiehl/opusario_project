import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText, getTextAsTitleCase } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class ManySelectComponent extends Component {
    constructor(props) {
        super(props);
        this.renderAddItemButton = this.renderAddItemButton.bind(this);
    }
    componentDidMount() {
        let apiRoute = this.props.apiRoute;
        if (this.props.filter) {
            apiRoute = `${apiRoute}?filter=${this.props.filter}`;
        }
        this.props.actions.fetchItems(this.props.namespace, apiRoute);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }
    renderAddItemButton() {
        return (
            <div className={"col-9"}>
                 {this.props.items.map(item => (
                    <button className={"button button-many-select"}
                            key={`button-${item.id}`} value={item.id}>
                        {item.name}
                        <i className="fa fa-plus-circle icon-add"></i>
                    </button>))}
            </div>
        )
    }
    render() {
        return (
            <div className={"row gtr-0 gtr-uniform"}>
                <FormFieldLabel componentId={this.props.componentId}/>
                {this.renderAddItemButton()}
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
            </div>
        );
    }
}

ManySelectComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    m2mModel: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};
