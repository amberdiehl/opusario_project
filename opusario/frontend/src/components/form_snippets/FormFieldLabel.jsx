import React from 'react';
import PropTypes from 'prop-types';
import { getFormattedLabelText } from '../../helpers';


export default function FormFieldLabel({ componentId }) {
    return (
        <div className="col-3 form-label">
            <label htmlFor={componentId}>
                {getFormattedLabelText(componentId)}
            </label>
        </div>
    );
};

FormFieldLabel.propTypes = {
    componentId: PropTypes.string.isRequired,
};