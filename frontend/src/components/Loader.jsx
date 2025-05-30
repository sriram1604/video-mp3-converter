import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoaderComp = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <TailSpin
                height={props.name === "first" ? "80" : "40"}
                width={props.name === "first" ? "80" : "40"}
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
            />
        </div>
    );
};

export default LoaderComp;
