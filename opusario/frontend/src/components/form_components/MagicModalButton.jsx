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
        // automatically select and show item created by adding returned instance ID to selected items, re-fetching
        // items associated with the select, close the modal, and reset the modal instance so that it's not left in an
        // update state.
        // TODO: Need to enable magic button to handle single select.
        // Call setSelectValue instead of addSelectItem and fetchItems needs to happen first
        if ((nextProps.childState.instanceId !== this.props.childState.instanceId) &&
            (nextProps.childState.instanceId !== 0)) {  // reset below will trigger adding a 0 key
            this.props.childActions.addSelectItem(this.props.childState.manySelectNamespace,
                nextProps.childState.instanceId);
            this.props.childActions.fetchItems(this.props.childState.manySelectNamespace,
                this.props.childState.manySelectRoute);
            this.props.childActions.setShowModal(this.props.childState.modalNamespace, false);
            this.props.childActions.resetModalInstance(this.props.childState.instanceNamespace);
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
