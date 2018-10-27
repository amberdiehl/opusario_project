import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ModalButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount() {
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.childState.instanceId !== this.props.childState.instanceId) {
            // add instance ID to many select selected items
            this.props.childActions.addSelectItem(this.props.childState.manySelectNamespace,
                nextProps.childState.instanceId);
            // refresh many select
            this.props.childActions.fetchItems(this.props.childState.manySelectNamespace,
                this.props.childState.manySelectRoute);
            // close the modal
            this.props.childActions.setShowModal(this.props.childState.modalNamespace, false)
        }
    }
    handleOnClick(e) {
        e.preventDefault();
        this.props.childActions.setShowModal(this.props.childState.modalNamespace, true)
    }
    render() {
        return (
            <button onClick={this.handleOnClick}>Add</button>
        );
    }
}

ModalButtonComponent.propTypes = {
    childState: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired
};
