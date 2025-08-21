import React from 'react';

const PageBlock = ({ children, id }) => {
    return (
        <section
            id={id}
            className="h-4/6 flex items-center justify-center m-6 relative z-40"
        >
            {children}
        </section>
    );
};

export default PageBlock;