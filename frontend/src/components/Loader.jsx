import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoaderComp = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <TailSpin
                height="80"
                width="80"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
            />
        </div>
    );
};

export default LoaderComp;
