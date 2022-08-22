import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Create = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Note Web App || Create</title>
            </Helmet>
        </HelmetProvider>
    );
};

export default Create;