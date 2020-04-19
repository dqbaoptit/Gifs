import React from 'react';
import './index.css';
export default (props) => {
    return (
        <div>
            <input
                placeholder={props.holder}
                value={props.value}
                onChange={props.handleChange} />
        </div>
    )
}
