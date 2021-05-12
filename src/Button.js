import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, className, children}) => 
            <div>
                <button
                    onClick={onClick}
                    className={className}
                    type="button">
                        {children}
                </button>
            </div>
        
 Button.propTypes = {
     onClick: PropTypes.func,
     className: PropTypes.string,
     children: PropTypes.node.isRequired
 };


export default Button;