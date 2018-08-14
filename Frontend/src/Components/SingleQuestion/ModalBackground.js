import React from 'react';

    const ModalBackground = ({onclick}) => {
        return(
            <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.1)'
            }}
            onClick={onclick}
           >
            
            </div>
        );
    }

    export default ModalBackground;