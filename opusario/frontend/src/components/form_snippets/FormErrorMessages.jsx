import React from 'react';
import PropTypes from 'prop-types';


export default function FormErrorMessages({trueFalse, messages}) {
    const errors = messages.map((message) => {
        return (
            <p>{message}</p>
        );
    });
    return (
        <div className={"row"} style={(trueFalse) ? {display: "block"} : {display: "none"}}>
            <div className={"col-10 form-error-message"}>
                {errors}
            </div>
        </div>
    );
};

FormErrorMessages.propTypes = {
    trueFalse: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired
};