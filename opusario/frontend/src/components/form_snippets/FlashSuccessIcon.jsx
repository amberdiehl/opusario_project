import React from 'react';
import PropTypes from 'prop-types';


export default function FlashSuccessIcon({trueFalse}) {
    return (
        <div className={"success-icon"}
              style={(trueFalse) ? {display: "inline-block"} : {display: "none"}}>
            <i className="fa fa-check-circle icon-large"></i>
        </div>
    );
};

FlashSuccessIcon.propTypes = {
    trueFalse: PropTypes.bool.isRequired
};
