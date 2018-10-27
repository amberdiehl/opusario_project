import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';


export default class ModalWrapperComponent extends Component {
    render(){
        return(
            <Fragment>
                <div className={(this.props.showModal) ? "modal" : "modal closed"}
                     id={`modal-${this.props.componentId}`}>
                    <div className={"modal-header"}>
                        <button className={"modal-close-button"}
                                onClick={() => {this.props.actions.setShowModal(this.props.namespace, false);}}>
                            Close
                        </button>
                    </div>
                    <div className={"modal-guts"}>
                        {this.props.children}
                    </div>
                </div>
                <div className={(this.props.showModal) ? "modal-overlay" : "modal-overlay closed"}
                     id={`modal-overlay-${this.props.componentId}`} />
            </Fragment>
        );
    }
}
ModalWrapperComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
