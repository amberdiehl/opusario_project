import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';


export default class ModalWrapperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: (typeof this.props.showModal === "undefined") ? false : this.props.showModal,
        };
        this.handleCloseOnClick = this.handleCloseOnClick.bind(this);
    }
    handleCloseOnClick(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            showModal: false
        })
    }
    render(){
        return(
            <Fragment>
                <div className={(this.state.showModal) ? "modal": "modal closed"} id={"modal"}>
                    <div className={"modal-header"}>
                        <button className={"modal-close-button"} onClick={this.handleCloseOnClick}>
                            Close</button>
                    </div>
                    <div className={"modal-guts"}>
                        {this.props.children}
                    </div>
                </div>
                <div className={(this.state.showModal) ? "modal-overlay" : "modal-overlay closed"} id="modal-overlay"/>
            </Fragment>
        );
    }
}
ModalWrapperComponent.propTypes = {
    showModal: PropTypes.bool
};
